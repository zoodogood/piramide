

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

    console.info(`%c%s`, "color: green; padding: 30px; font-size: 0.9em;", "🦝 Игра запущена");
    console.info("%c%s", "padding: 30px;", "Всё, что Вы помещаете в console.log — будет отображено здесь!");

    this.createTowers();

    delete this.hasWin;
    document.querySelector("#title").style.color = "";
    document.querySelector("#title").textContent = "";
  }



  stepHandle( action ){
    const k = 5 / params.slabsSpeed;

    action.type = "step";
    action.allowNext = async ({action, next, processed}) => {
      if ( next?.type !== "step" )
        return;

      if ( !this.multiSlab )
        return;

      if ( [action, ...processed.map(e => e.action)].some(e => e.to === next.from) )
        return;

      await delay( 120 * k );
      return true;
    };

    action.func = this.moveSlab.bind(this);
    this.action.push(action);
  }


  consoleHandle(log){
    const consoleLog = async () => {
      if (typeof log === "object")
        console.table(log);

      else
        console.log(`%c${ log }`, "padding: 15px; border-bottom: 1px solid green;");

    }

    let action = {};
    action.type = "console";
    action.func = consoleLog;
    this.action.push(action);
  }


  // Срабатывает при game.emit("win"), но не в момент победы по визуализации
  winHandle(){
    this.action.trace.filter(e => e.type === "step").at(-1).toWin = true;
    let action = { type: "win", func: this.visualizeWin.bind(this) };
    this.action.push( action );

    gtag("event", "victory");
  }



  async moveSlab({ from, to, toWin = false }){
    let fromTower = this.gameElement.children.item( from );
    let toTower = this.gameElement.children.item( to );

    let slabElement = [...fromTower.children][0];


    let [ top, left ] = [
      slabElement.parentNode.offsetTop  + slabElement.offsetTop,
      slabElement.parentNode.offsetLeft + slabElement.offsetLeft
    ];
    slabElement.parentNode.removeChild( slabElement );

    // Для подсчёта начальной высоты
    const towerSlabCount = [...fromTower.children].length;


    document.getElementById("flyZone").append(slabElement);
    slabElement.style.top  = `${ top  }px`;
    slabElement.style.left = `${ left }px`;

    const k = 5 / params.slabsSpeed;
    await delay(30);


    await slabElement.transform({ value: "-30vh", property: "translateY", ms: 200 * k });



    // Расстояние между башнями
    let distance = toTower.offsetLeft - fromTower.offsetLeft;

    slabElement.transform({ value: `${distance}px`, property: "translateX", ms: 200 * k });


    if (toWin){
      slabElement.transform({value: 1.2, property: "scale", ms: 700});
      toTower.transform({value: 1.2, property: "scale", ms: 700});
      await delay(1200);
      await slabElement.transform({ value: "-37vh", property: "translateY", ms: 70 });

      new Timeout(() => toTower.transform({ value: 1, property: "scale", ms: 700 }), 270 * k);
    }


    await delay(70 * k);

    let slabsHeight = slabElement.offsetHeight * (towerSlabCount - [...toTower.children].length);
    await slabElement.transform({ value: `${ slabsHeight }px`, property: "translateY", ms: 200 * k });


    slabElement.style.transform  = "";
    slabElement.style.transition = "";
    toTower.prepend(slabElement);


    if ( !this.hasWin )
      document.querySelector("#title").textContent = `${  Math.round((this.action.index) / this.action.trace.length * 100)  }%`;

    return;
  }



  createTowers(){
    this.gameElement.innerHTML = "";
    let list = this.game.list;

    let size = this.game.getGameParams().size;

    this.towers = [];

    for (let tower of list) {
      tower = this.createTower( size ).setSlabs( tower );
      tower.eachSlab(slab => slab.setColor(null, {towerSize: tower.size}));

      this.gameElement.append( tower.toHTML() );
    }
  }


  createTower(size){
    let tower = new Tower(size);
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

    await delay(2500);

    glitch = new GlitchText(title.textContent, `YES, YOU ARE WON !`, {speed: 0.1});

    for (let word of glitch){
      title.textContent = word;
      await delay(40);
    }

    await delay(500);

    glitch = new GlitchText(title.textContent, `${ this.action.index }`, {speed: 0.1});
    title.innerHTML = "YES, YOU ARE WON !\n<span class = 'small'>in ??? steps</span>";

    for (let word of glitch){
      title.children.item(0).textContent = `in ${ word } steps`;
      await delay(20);
    }

    await delay(5000);

    title.style.color = "rgba(0, 0, 0, 0.15)";
    await delay(1400);
    glitch = new GlitchText(title.textContent, "0%", {speed: 0.4});

    for (let word of glitch){
      title.textContent = word;
      await delay(20);
    }

    return;
  }



}





class Tower {
  constructor(size){
    this.size = size;
  }



  toHTML(){
    let tower = document.createElement("div");
    tower.classList.add("array");


    this.slabs.forEach(slab => tower.append(  slab.toHTML()  ));



    tower.addEventListener("click", e => this.clickHandle(e));
    this.html = tower;
    return tower;
  }

  setSlabs(array){
    this.slabs = [];

    for (let slab of array) {
      slab = new Slab( slab, this.size );
      this.slabs.unshift(slab);
    }

    return this;
  }

  eachSlab(callback){
    this.slabs.forEach(callback);
    return this;
  }

  async clickHandle(){
    if (!params.strangeClick)
      return;

    const effectType = ["filter", "transform"].random();
    const target = this.html.style;

    if (target.transform === "scale(1)")
      target.transform = "";

    if (target[effectType] !== "")
      return;

    const effects = {
      filter: [
        "blur(10px)",
        "invert(1)",
        "opacity(0.2)",
        "contrast(2)",
        "sepia(1)",
        "saturate(2)",
        "drop-shadow(0px 0px 2px black)",
        `brightness(${ [1.7, 0.4].random() })`,
        `hue-rotate(${ random(30, 360) }deg)`
      ],
      transform: [
        "skew(125deg, 40deg)",
        "translateX(120vw)",
        "scale(0.5)",
        `rotate(${ random(-8, 8) * 45 }deg)`,
        `rotate3d(1, 1, 1, -360deg`
      ]
    };

    target[effectType] = effects[effectType].random();
    await delay(700);
    target[effectType] = "";
  }

}





class Slab {
  constructor( number, size = 15 ){
    this.number = number;
    this.size   = size;
  }



  toHTML(){
    let slab = document.createElement("div");
    slab.classList.add("slab");

    slab.style.setProperty("--my-width",  this.number / this.size);
    slab.style.setProperty("--my-height", this.size);

    slab.style.background = this.color;
    slab._parent = this;
    return slab;
  }



  setColor( colorizze, {towerSize} ){
    colorizze ||= this.constructor.globalColorizze;


    if (typeof colorizze === "function")
      colorizze = colorizze( this.number, {towerSize} );

    this.color = colorizze;
  }



  static globalColorizze = (n) => n % 2 ? '#c6e44e' : '#70d729';
}








const visualizer = new Visualizer("#towersList");





Game.prototype.console = function(log){
  this.emit("console", log);
}

Game.prototype.visualize = function(){
  this.on("generate", () => mainGenerate(this));
  this.on("win", () => visualizer.winHandle());
  this.on("step", e => visualizer.stepHandle(e));
  this.on("console", log => visualizer.consoleHandle(log));


  mainGenerate(this);

  return this;
}




// Возвращает функцию, которая окрашивает плитки
function resolveColorizzeFuncions(){

  // Создает JS-функции rgba, hsl, rgb, которые возвращают CSS строку типа "rgb(32, 33, 5)"
  const toCode = (funcName) => (...colors) => {
    const simplifyPercent = (color, i) => funcName.startsWith("hsl") && (i === 1 || i === 2) ? `${ color }%` : color;
    colors = colors.map(simplifyPercent).join(", ");
    return `${ funcName }(${ colors })`;
  };
  let colorsFunc = ["rgb", "rgba", "hsl", "hsla"];


  const painters = params.colorizeFunc.map(painter => {
    const code = painter.func;
    const func = new Function("n", "size", ...colorsFunc, `return ${ code }`);
    const method = (n, {towerSize}) => func.call( null, n, towerSize, ...colorsFunc.map(toCode) );
    painter.colorizze = method;

    return painter;
  });

  return painters;
}
Slab.colorizeFunctions = resolveColorizzeFuncions();


// Вызывается при generate
function mainGenerate( game ){
  let size = game.getGameParams().size;
  const colorizze = Slab.colorizeFunctions.random().colorizze;
  Slab.globalColorizze = colorizze;

  visualizer.generateHandle( game );


  displayTowerExample();
}



window.events.on("main", () => {
  const colorizze = Slab.colorizeFunctions.random().colorizze;
  Slab.globalColorizze = colorizze;
  displayTowerExample();

  if (!visualizer.game){
    displayGhostTowers();
  }
});


function displayTower(node, slabs, {colorizze} = {}){
  let tower = new Tower( slabs )
    .setSlabs(  [...new Array(slabs)].map((_, i) => slabs - i)  )
    .eachSlab((slab, index) => slab.setColor(colorizze, {towerSize: slabs}))
    .toHTML();

  node.innerHTML = "";
  node.append(tower);
}

function displayTowerExample(){
  const node = document.querySelector("#towerExample");
  return displayTower(node, 15);
}


function displayGhostTowers(){
  const colors = resolveColorizzeFuncions();
  const nodes = [...document.querySelectorAll(".ghost-tower")];

  nodes.forEach( node => displayTower(node, 9, {colorizze: colors.random().colorizze}) );
}
