// Устаналивает цвет плитке, можете настроить по своему хотению и скинуть мне :D

const params = new Params("userParams").getList();

function randomColorizzeFunc(size){
  const colorsFunc = [
    {
      func: (n) => `hsl(${ random(255) }, 100%, 70%)`,
      _weight: 1
    },
    {
      func: (n) => `hsl(${ random(50) + 190 }, ${Math.round(70 / size * n) + 30}%, 70%)`,
      _weight: 5
    },
    {
      func: (n) => `hsl(${ random(50) }, 100%, 70%)`,
      _weight: 15
    },
    {
      func: (n) => n % 2 ? "#c6e44e" : "#70d729",
      _weight: 25
    }
  ];
  return colorsFunc.random(false, true).func;
}



class Visualizer {
  constructor(elementSelector = "#game"){
    this.steps = [];
    this.score = 0;
    this.gameElement = document.querySelector( elementSelector );
    if (!this.gameElement)
      throw new Error(`could not find item ${ elementSelector }`);


  }


  generateHandle(game){
    this.game = game;
    this.gameElement._game = game;

    if (this.score){
      scoreMap.push([this.score, game.hasWin]);
      this.score = 0;
      localStorage.setItem("scoreMap", JSON.stringify(scoreMap));
    }

    this.steps.length = 0;
    this.towers = [];

    console.log("%c🦝 Игра сгенерированна. Старт! ", "color: green; padding: 30px;");
    console.log("%cВсе, что вы помещаете в console.log будет отображено здесь!", "padding: 30px;");

    this.createTowers();
    document.querySelector("#title").style.color = "";
  }



  stepHandle( move = {from: 0, to: 1} ){
    this.steps.push(move);

    this.stepsHandler();
  }


  // Срабатывает при game.emit("win"), но не в момент победы по визуализации
  winHandle(){
    // Учитывая синхронность операций мы можем точно быть уверены, что последний сделанный шаг привёл к победе
    this.steps.at(-1).toWin = true;
  }


  async stepsHandler(){

    if (this.stepsHandler.handle === true)
      return;

    const title = document.querySelector("#title");

    this.stepsHandler.handle = true;
    await delay(30);

    while ( this.steps.length ){
      let move = this.steps.shift();
      await this.moveSlab(move);

      this.score++;
      if (!this.hasWin)
        title.textContent = `${Math.round(this.score / (this.score + this.steps.length) * 100)}%`;

      if (move.toWin)
        this.visualizeWin();

    }


    this.stepsHandler.handle = false;
  }


  async moveSlab({ from, to, toWin = false }){
    let fromTower = this.gameElement.children.item( from );
    let toTower = this.gameElement.children.item( to );

    let sameElement = [...fromTower.children][0];
    const k = 5 / params.slabsSpeed;

    await delay(30);
    await sameElement.transform({value: "-30vh", property: "translateY", ms: 200 * k});



    // Расстояние между башнями
    let distance = toTower.getBoundingClientRect().left - fromTower.getBoundingClientRect().left;



    sameElement.transform({value: `${distance}px`, property: "translateX", ms: 200 * k});


    if (toWin){
      sameElement.transform({value: 1.2, property: "scale", ms: 700});
      toTower.transform({value: 1.2, property: "scale", ms: 700});
      await delay(1200);
      await sameElement.transform({value: "-37vh", property: "translateY", ms: 70});
    }


    await delay(100 * k);

    let slabsHeight = sameElement.style.height.slice(0, -2) * ( [...fromTower.children].length - 1 - [...toTower.children].length );
    await sameElement.transform({value: `${slabsHeight}vh`, property: "translateY", ms: 200 * k});


    toTower.transform({value: 1, property: "scale", ms: 200 * k});



    sameElement.style.transition = "";
    sameElement.style.transform = "";
    delete sameElement.style.transition;

    toTower.prepend(sameElement);
    return;
  }



  createTowers(){
    this.gameElement.innerHTML = "";
    let list = this.game.list;

    this.towers = [];

    for (let tower of list) {
      tower = this.createTower(tower, this).setSlabs( this.game.getGameParams().size );

      this.gameElement.append( tower.toHTML() );
    }
  }


  createTower(array){
    let tower = new Tower(array, this);
    this.towers.push(tower);
    return tower;
  }



  async visualizeWin(){
    this.hasWin = true;
    const title = document.querySelector("#title");
    await delay(500);

    title.style.color = "#ffffff";
    await delay(800);

    let glitch = new GlitchText(title.textContent, "YOU VICTORY!");

    for (let word of glitch){
      title.textContent = word;
      await delay(30);
    }

    title.style.color = "#ffffff";
  }



}





class Tower {
  constructor(array, visualizer){
    this.array = array;
  }



  toHTML(){
    let tower = document.createElement("div");
    tower.classList.add("array");


    this.slabs.forEach(slab => tower.append(  slab.toHTML()  ));



    tower.addEventListener("click", e => this.clickHandle(e));
    this.html = tower;
    return tower;
  }

  setSlabs(size){
    this.slabs = [];

    for (let slab of this.array) {
      slab = new Slab( slab, size );
      this.slabs.unshift(slab);
    }

    return this;
  }

  clickHandle(){
    let
      elementCount = this.array.length,
      greatestSlab = Math.max( ...this.array ),
      smallestSlab = Math.min( ...this.array );

    let name = Tower.namesList.random();

    let description =
      this.array.length === 1 ?
      `<b>Характеристики:</b>\nИмеет всего один элемент со значением ${ this.array[0] };` :
      this.array.length ?
      `<b>Характеристики:</b>\nКоличество элементов: ${ elementCount }\nРазмер самой большой плитки: ${ greatestSlab }\nСамой маленькой: ${ smallestSlab }` :
      `<b>Характеристики:</b>\nОна пустая; И это всегда отлично. Башня без плит — хорошее пространство для их вдумчивого размещения, а также знак того, что вы близки к победе!`



    Alert.create(description, "success", `Башня ${ name }`);
  }

  static namesList = ["великого бездельника", "Енота", "Человека", "какого-то волшебника", "великого алгоритма"];
}





class Slab {
  constructor( number, size = 15 ){
    this.number = number;
    this.size   = size;

    this.setColor( this.constructor.colorFunc );
  }



  toHTML(){
    let slab = document.createElement("div");
    slab.classList.add("slab");

    slab.style.width   = `${100 / this.size * this.number}%`;
    slab.style.height  = `${25 / this.size}vh`

    slab.style.backgroundColor = this.color;
    slab._parent = this;
    return slab;
  }



  setColor( color ){
    if (typeof color === "function")
      color = color( this.number );

    this.color = color;
  }



  static ColorFunc(func){
    this.colorFunc = func;
    return this;
  }
}



const visualizer = new Visualizer("#game");





const scoreMap = JSON.parse(localStorage.getItem("scoreMap")) || [];


Game.prototype.visualize = function(){
  this.on("generate", () => mainGenerate(this));
  this.on("win", () => visualizer.winHandle());
  this.on("step", e => visualizer.stepHandle(e));


  mainGenerate(this);

  return this;
}


// Вызывается при generate
function mainGenerate( game ){
  let size = game.getGameParams().size;

  Slab.ColorFunc( randomColorizzeFunc( size ) );
  visualizer.generateHandle( game );


  let tower = new Tower(  [...new Array(15)].map((e, i) => 15 - i + 1)  ).setSlabs( 15 ).toHTML();

  document.querySelector("#towerExample").innerHTML = "";
  document.querySelector("#towerExample").append(tower);

  tower.parentNode.style.display = "flex";
  tower.parentNode.style.justifyContent = "center";
  tower.parentNode.style.transform = "scale(0.8)";
}




class GlitchText {
  constructor(from = "", to = "hello, world"){
    this.from = from;
    this.to   = to;

    this[Symbol.iterator] = this.iteratorFunction;
  }

  *iteratorFunction(){
    let word = [...this.from];
    const target = this.to;

    while (word.length !== target.length){
      if (word.length > target.length)
        word.pop();

      if (word.length < target.length)
        word.push("#");

      word = word.map(e => String.fromCharCode( random(20, 40) ));
      yield word.join("");
    }



    while ( word.join("") !== target ){

      word.forEach((letter, i) => {
        if (letter === target[i]){
          return;
        }

        let charCode = letter.charCodeAt(0), targetCode = target[i].charCodeAt(0);
        word[i] = String.fromCharCode( charCode >= targetCode ? --charCode : 15 + charCode );
      });

      yield word.join("");
    }


    return;
  }
}






// Функция для трансформаций
// Синтаксис применения HTMLElement.transform({property: "scale", value: 1.2, ms: 200})
Object.defineProperty( HTMLElement.prototype, "transform", {
  value: async function ({value, property, ms}){
    // Строка текущих трансформаций
    let now  = this.style.transform;

    if ( ms ){
      this.style.transitionDuration = `${ ms }ms`;
    }

    let reg = new RegExp(`${property}\\s?\\((.+?)\\)`, "i");
    let includes = now.match( reg );

    if (includes){
      this.style.transform = now.replace(includes[0], `${ property }(${ value })`);
      await delay(ms);
      return;
    }

    this.style.transform += ` ${ property }(${ value })`;
    await delay(ms);
    return;
  }
});



class Console {

}
