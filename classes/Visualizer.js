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


let setSlabColor = [
  {
    func: (n) => `hsl(${ random(255) }, 100%, 70%)`,
    _weight: 1
  },
  {
    func: (n) => `hsl(${ random(50) + 190 }, ${Math.round(70 / 15 * n) + 30}%, 70%)`,
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
].random(false, true).func;



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
      scoreMap.push([score, game.isWin()]);
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



  winHandle(){
    Alert.create(`ЭТО ПОБЕДА! ⛊\nВыполнено ходов — ${ this.game.getScore() }`, "success", "Пришёл, увидел, Победил!");
  }


  async stepsHandler(){
    if (this.stepsHandler.handle === true){
      return;
    }

    this.stepsHandler.handle = true;

    while ( this.steps.length ){
      let move = this.steps.shift();
      await this.moveSlab(move);
    }

    this.stepsHandler.handle = false;
  }


  async moveSlab({ from, to }){
    let fromTower = this.gameElement.children.item( from );
    let sameElement = [...fromTower.children][0];
    await delay(15);

    sameElement.style.transform = `translateY(-30vh)`;
    await delay(200);

    let toTower = this.gameElement.children.item( to );

    // Расстояние между башнями
    let distance = toTower.getBoundingClientRect().left - fromTower.getBoundingClientRect().left;


    sameElement.style.transform = `translateY(-30vh) translateX(${distance}px)`;
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
    Alert.create(`<b>Характеристики:</b>\nКоличество элементов: ${ elementCount }\nРазмер самой большой плитки: ${ greatestSlab }\nСамой маленькой: ${ smallestSlab }`, "success", `Башня ${ name }`);
  }

  static namesList = ["великого бездельника", "Енота", "Человека", "какого-то волшебника"];
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



Slab.ColorFunc( setSlabColor );

const visualizer = new Visualizer("#game");







const scoreMap = JSON.parse(localStorage.getItem("scoreMap")) || [];
let score = 0;

Game.prototype.visualize = function(){
  this.on("generate", () => visualizer.generateHandle());
  this.on("step", e => visualizer.stepHandle(e));
  this.on("win", () => visualizer.winHandle());


  visualizer.generateHandle(this);

  return this;
}






let tower = new Tower(  [...new Array(15)].map((e, i) => i + 1)  ).setSlabs( 15 ).toHTML();

document.querySelector("#towerExample").append(tower);

tower.parentNode.style.display = "flex";
tower.parentNode.style.justifyContent = "center";
tower.parentNode.style.transform = "scale(0.8)";
