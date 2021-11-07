// Устаналивает цвет плитке, можете настроить по своему хотению и скинуть мне :D

function randomColorizzeFunc(size){
  const colorsFunc = [
    {
      func: (n) => `hsl(240, 30%, ${25 - (n % 5) * 5}%)`,
      _weight: 1
    },
    {
      func: (n) => `hsl(${ random(255) }, 100%, 70%)`,
      _weight: 1
    },
    {
      func: (n) => `hsl(${ random(50) + 190 }, ${Math.round(70 / size * n) + 30}%, 70%)`,
      _weight: 10
    },
    {
      func: (n) => `hsl(${ random(50) }, 100%, 70%)`,
      _weight: 30
    },
    {
      func: (n) => n % 2 ? "#c6e44e" : "#70d729",
      _weight: 50
    }
  ];
  return colorsFunc.random(false, true).func;
}



class Visualizer {
  constructor(elementSelector = "#game"){
    this.gameElement = document.querySelector( elementSelector );

    if (!this.gameElement)
      throw new Error(`could not find item ${ elementSelector }`);

    this.action = new ActionHandler();
    this.multiSlab = params.multiSlab;
  }


  generateHandle(game){
    this.game = game;
    this.gameElement._game = game;

    this.action.handle();

    this.towers = [];

    console.info(`%c🦝 Игра сгенерированна. СТАРТ!`, "color: green; padding: 30px;");
    console.info("%cВсе, что вы помещаете в console.log будет отображено здесь!", "padding: 30px;");

    this.createTowers();

    delete this.hasWin;
    document.querySelector("#title").style.color = "";
    document.querySelector("#title").textContent = "";
  }



  stepHandle( action ){
    action.type = "step";
    action.allowNext = async ({action, next, processed}) => {
      if ( next?.type !== "step" )
        return;

      if ( !this.multiSlab )
        return;

      if ( [action, ...processed.map(e => e.action)].some(e => e.to === next.from) )
        return;

      await delay( 70 );
      return true;
    };

    action.func = this.moveSlab.bind(this);
    this.action.push(action);
  }


  // Срабатывает при game.emit("win"), но не в момент победы по визуализации
  winHandle(){
    this.action.trace.filter(e => e.type === "step").at(-1).toWin = true;
    let action = { type: "win", func: this.visualizeWin.bind(this) };
    this.action.push( action );
  }



  async moveSlab({ from, to, toWin = false }){
    let fromTower = this.gameElement.children.item( from );
    let toTower = this.gameElement.children.item( to );

    let sameElement = [...fromTower.children][0];


    let { top, left } = sameElement.getBoundingClientRect();
    sameElement.parentNode.removeChild( sameElement );


    document.getElementById("flyZone").append(sameElement);
    sameElement.style.top = `${ top }px`;
    sameElement.style.left = `${ left }px`;

    const k = 5 / params.slabsSpeed;
    await delay(30);


    await sameElement.transform({ value: "-30vh", property: "translateY", ms: 200 * k });



    // Расстояние между башнями
    let distance = toTower.getBoundingClientRect().left - fromTower.getBoundingClientRect().left;



    sameElement.transform({ value: `${distance}px`, property: "translateX", ms: 200 * k });


    if (toWin){
      sameElement.transform({value: 1.2, property: "scale", ms: 700});
      toTower.transform({value: 1.2, property: "scale", ms: 700});
      await delay(1200);
      await sameElement.transform({ value: "-37vh", property: "translateY", ms: 70 });
    }


    await delay(100 * k);

    let slabsHeight = sameElement.style.height.slice(0, -2) * ( [...fromTower.children].length - 1 - [...toTower.children].length );
    await sameElement.transform({ value: `${slabsHeight}vh`, property: "translateY", ms: 200 * k });


    toTower.transform({ value: 1, property: "scale", ms: 200 * k });

    sameElement.style.transition = "";
    sameElement.style.transform = "";
    delete sameElement.style.transition;

    toTower.prepend(sameElement);


    if ( !this.hasWin )
      document.querySelector("#title").textContent = `${  Math.round((this.action.index) / this.action.trace.length * 100)  }%`;

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

    if (params.activatePoligon)
      poligon.launch();


    document.querySelector("#title").textContent = `${  Math.round((this.action.index) / this.action.trace.length * 100)  }%`;

    this.hasWin = true;
    const title = document.querySelector("#title");
    await delay(500);

    title.style.color = "#ffffff";
    await delay(800);

    let glitch = new GlitchText(title.textContent, "YOUR VICTORY!");

    for (let word of glitch){
      title.textContent = word;
      await delay(40);
    }

    await delay(2000);

    glitch = new GlitchText(title.textContent, "YES, YOU ARE WON !", {speed: 0.2});

    for (let word of glitch){
      title.textContent = word;
      await delay(30);
    }

    await delay(5000);
    title.style.color = "rgba(0, 0, 0, 0.15)";
    await delay(2500);
    glitch = new GlitchText(title.textContent, "0%", {speed: 0.2});

    for (let word of glitch){
      title.textContent = word;
      await delay(30);
    }

    return;
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

    slab.style.width   = `${40 / this.size * this.number}vh`;
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





class ActionHandler {
  #prevent = false;

  constructor(){
    this[Symbol.asyncIterator] = this.iteratorFunction;
    this.events = new EventEmitter();

    this.trace = [];
    this.index = 0;
  }



  iteratorFunction(){
    return { next: this.iteratorNext.bind(this) };
  }



  async iteratorNext(){

    if ( this.#prevent ){
      this.#prevent = false;
      this.trace    = [];
      this.index    = 0;
      return {
        done: true,
        value: { trace: this.trace, index: this.index }
      };
    }


    if ( this.trace.length - 1 < this.index )
      await new Promise(res => this.events.once("push", res));

    let action = this.trace[ this.index++ ];

    let promise = action.func( action );
    promise.action = action;
    this.processed.push( promise );

    let data = {
      action,
      next: this.trace.at( this.index ),
      trace: this.trace,
      processed: this.processed
    };
    /*
      Если функция существует и возвращает истину,
      Досрочно запустить следующее действие
      Иначе ждать завершения всех активных действий
    */
    if ( await action.allowNext?.( data ) )
      return { done: false, value: "pending" };

    let values = await Promise.all( this.processed );
    this.processed = [];
    return { done: false, value: values };
  }



  async handle(){
    let iterable = this;

    if ( this.trace.length )
      this.preventHundle();

    this.processed = [];
    for await (let values of iterable)
      this.events.emit("chunkHandled", values);
      // На самом деле даже не важно что здесь будет

  }



  preventHundle(){
    this.push( {type: "beforeEnd"} );
    this.#prevent = true;
    this.push( {type: "afterEnd"} );
  }



  push( action ){
    this.trace.push( action );
    this.events.emit("push", action);
  }


}


const visualizer = new Visualizer("#towersList");






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


  let tower = new Tower(  [...new Array(15)].map((e, i) => 15 - i)  ).setSlabs( 15 ).toHTML();

  document.querySelector("#towerExample").innerHTML = "";
  document.querySelector("#towerExample").append(tower);

  tower.parentNode.style.display = "flex";
  tower.parentNode.style.justifyContent = "center";
  tower.parentNode.style.transform = "scale(0.8)";
}




class GlitchText {
  constructor(from = "", to = "hello, world", {speed = 1} = {}){
    this.from = from;
    this.to   = to;

    this.speed = speed;

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
        word[i] = String.fromCharCode( charCode >= targetCode ? --charCode : Math.floor(15 * this.speed) + charCode );
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
