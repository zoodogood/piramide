// Устаналивает цвет плитке, можете настроить по своему хотению и скинуть мне :D

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
      scoreMap.push([score, game.hasWin]);
      score = 0;
      localStorage.setItem("scoreMap", JSON.stringify(scoreMap));
    }

    this.steps.length = 0;
    this.towers = [];

    console.log("%c🦝 Игра сгенерированна. Старт! ", "color: green; padding: 30px;");
    console.log("%cВсе, что вы помещаете в console.log будет отображено здесь!", "padding: 30px;");

    this.createTowers();
  }



  stepHandle( move = {from: 0, to: 1} ){
    score = this.game.getScore();
    this.steps.push(move);

    this.stepsHandler();
  }


  // Срабатывает при game.emit("win"), но не в момент победы по визуализации
  winHandle(){
    // Учитывая синхронность операций мы можем точно быть уверены, что последний сделанный шаг привёл к победе
    this.steps.at(-1).toWin = true;
  }


  async stepsHandler(){
    if (this.stepsHandler.handle === true){
      return;
    }

    this.stepsHandler.handle = true;

    while ( this.steps.length ){
      let move = this.steps.shift();
      await this.moveSlab(move);

      if (move.toWin)
        this.visualizeWin();

    }

    this.stepsHandler.handle = false;
  }


  async moveSlab({ from, to, toWin = false }){
    let fromTower = this.gameElement.children.item( from );
    let toTower = this.gameElement.children.item( to );

    let sameElement = [...fromTower.children][0];

    await delay(30);

    sameElement.style.transform = `translateY(-30vh)`;
    await delay(200);



    // Расстояние между башнями
    let distance = toTower.getBoundingClientRect().left - fromTower.getBoundingClientRect().left;


    sameElement.style.transform = `translateY(-30vh) translateX(${distance}px)`;

    // if (toWin){
    //   await delay(300);
    //   sameElement.style.transform = `scale(1.5) translateY(-30vh) translateX(${distance}px)`;
    // }
    // else {
    //
    // }

    await delay(175);

    let slabsHeight = sameElement.style.height.slice(0, -2) * ( [...fromTower.children].length - 1 - [...toTower.children].length );
    sameElement.style.transform = `translateY(${slabsHeight}vh) translateX(${distance}px)`;
    await delay(200);

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
      this.slabs.push(slab);
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
let score = 0;

Game.prototype.visualize = function(){
  this.on("win", () => visualizer.winHandle());
  this.on("generate", () => mainGenerate(this));
  this.on("step", e => visualizer.stepHandle(e));


  mainGenerate(this);

  return this;
}


// Вызывается при generate
function mainGenerate( game ){
  let size = game.getGameParams().size;

  Slab.ColorFunc( randomColorizzeFunc( size ) );
  visualizer.generateHandle( game );


  let tower = new Tower(  [...new Array(15)].map((e, i) => i + 1)  ).setSlabs( 15 ).toHTML();

  document.querySelector("#towerExample").append(tower);

  tower.parentNode.style.display = "flex";
  tower.parentNode.style.justifyContent = "center";
  tower.parentNode.style.transform = "scale(0.8)";
}
