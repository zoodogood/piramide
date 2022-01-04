const GUIDANCES = [
  [`const NEW_YEAR = "31.12";`, "Строка"],
  [`// ---------------------- { } ----------------------\nВ этом меню Вы сможете найти примеры небольшого кода,\nкоторые помогут разобраться с написанием алгоритма.\nПеретаскивайте плитки с подсказками, чтобы выделить главное.\nПопробуйте переместить этот совет в самый низ списка\n// -------------------------------------------------`, "Как приручить дракона"],
  [`// Как стоит представлять понятия башни и списка:\nlet tower = [7, 12, 3];\nlet list = [tower, tower1, tower2];`, "Массивы"],
  [`// Доступные данные\n\n// Массив башен\nlet towers = game.list;\nlet secondTower = towers.at(1);\n// Каждая башня — массив плит\nlet slab = secondTower.at(0);`, "мяу"],
  [`// Чтобы перемещать плитки используются номера башен и функция \`step\`\ngame.step(1, 2);`, "Перемещение"],
  [`// Вывести каждый элемент башни\nwhile (i < tower.length){\n  console.log( tower.at(i) );\n  i++;\n}`, "Перебор циклом"],
  [`// НАЙТИ БАШНЮ С ПЛИТКОЙ РАЗМЕРОМ 15;\nfunction findTower(slab){\n  let i = 0;\n  while (i < list.length){\n    let tower = list.at(i);\n    let isIncludes = tower.includes(slab);\n\n    if (isIncludes)\n      return tower;\n\n    i++;\n  }\n}\n\nlet tower = findTower(15);`, "Башня с плиткой нужного размера"],
  [`console.log("С наступающим");`, "Вывод в консоль"],
  [`Стремитесь разобраться в том,\nчто из себя представляет каждая переменная;\nчто делает та или иная функция.`, "Первый совет"],
  [`// Пока истина — учись.\nwhile (true) learn();`, "Первое условие"],
  [`Вы достигли конца библиотеки 🔥\n/*\n░▄▀▀▀▀▄░░▄▄\n█░░░░░░▀▀░░█░░░░░░▄░▄\n█░║░░░░██░████████████\n█░░░░░░▄▄░░█░░░░░░▀░▀\n░▀▄▄▄▄▀░░▀▀\n*/`, "Откройте достижение"]
];


class Library {
  constructor({ container, symbolsCount }){
    this.container = container;
    this.symbolsCount = symbolsCount;
    container.classList.add("library-container");

    this.manager = new GuidancesManager();

    container.innerHTML = this.constructor.HTML;
    this.addCodeBlocks( this.container.querySelector("#codesBlocks"), this.manager.getOpening() );
    this.addDraggableHandlers();

    this.checkDiscoverises(this.container.querySelector(".discoveries"), this.symbolsCount);
  }


  addCodeBlocks(container, opening = []){
    for (let index of opening){
      let [code, title] = GUIDANCES.at( index );
      let node = document.createElement("code");

      node.title = title;
      node.textContent = code;
      hljs.highlightElement(node);

      container.append(node);
    }
  }


  addDraggableHandlers(){
    let container = this.container.querySelector("#codesBlocks");
    const isCode = (node) => node.nodeName === "CODE" && this.container.contains(node);

    const swipeBlocks = (node, targetNode) => {
      let next = targetNode.nextElementSibling;

      if (next === node)
        next = next.previousElementSibling;

      container.insertBefore(targetNode, node);
      container.insertBefore(node, next);

      this.manager.update( this.container.querySelector("#codesBlocks") );
    }

    let ephemeral, codeNode;

    const moveHandler  = (mouseEvent) => {
      let { x: containerX, y: containerY } = container.getBoundingClientRect();
      containerY -= container.scrollTop;

      let { width, height } = ephemeral.getBoundingClientRect();

      ephemeral.style.top  = `${ mouseEvent.clientY - containerY - height / 2 }px`;
      ephemeral.style.left = `${ mouseEvent.clientX - containerX - width  / 2 }px`;
    };


    const enterHandler = (mouseEvent) => {
      let targetNode = mouseEvent.path.find(isCode);
      if (!targetNode || targetNode === codeNode)
        return;

      targetNode.classList.add("dragzone");
    };


    const leaveHandler = (mouseEvent) => {
      let targetNode = mouseEvent.path.find(isCode);
      if (!targetNode || targetNode === codeNode)
        return;

      targetNode.classList.remove("dragzone");
    };




    container.addEventListener("mousedown", async mouseEvent => {
      codeNode = mouseEvent.path.find(isCode);
      if (!codeNode)
        return;

      ephemeral = codeNode.cloneNode(true);
      ephemeral.classList.add("ephemeral");
      container.append(ephemeral);

      codeNode.classList.add("dragged");

      container.addEventListener("mousemove", moveHandler);
      container.addEventListener("mouseover", enterHandler);
      container.addEventListener("mouseout",  leaveHandler);


      let mouseUpEvent = await new Promise(res => document.body.addEventListener("mouseup", res, {once: true}));


      container.removeEventListener("mousemove", moveHandler);
      container.removeEventListener("mouseover", enterHandler);
      container.removeEventListener("mouseout",  leaveHandler);

      codeNode.classList.remove("dragged");
      ephemeral.remove();

      let targetNode = mouseUpEvent.path.find(isCode);
      if (!targetNode || targetNode === codeNode)
        return;

      targetNode.classList.remove("dragzone");
      swipeBlocks(codeNode, targetNode);
    });
  }


  displayTargetHTML(){
    let target = this.manager.getSymbolsTarget() - this.symbolsCount;

    if (target < 0)
      return "";

    if (this.manager.getOpening().length === GUIDANCES.length)
      return "";

    return `<center>Напишите ещё ${ ending(target, "символ", "ов", "", "а") }, чтобы открыть новые подсказки</center>`
  }


  checkDiscoverises(container, count){
    new Discoveries({ library: this, container })
      .checkReady(count)
      .init();
  }


  static HTML = `
    <span><small>Примеры кода нельзя скопировать. T_T<br>Ручное написание положительно влияет на понимание того, что Вы делаете.</small></span>
    <br>
    <main id = "codesBlocks"></main>
    <hr>
    <br>
    <div class = "discoveries"></div>
  `
}





class GuidancesManager {
  #opening;
  constructor(){
    this.#opening = JSON.parse( localStorage.getItem("guidances") ) || this.constructor.BASIC_GUIDANCES;

  }


  getOpening(){
    return this.#opening;
  }


  getSymbolsTarget(){
    return ~~( Math.pow(1.13099, this.#opening.length + 1) * 100 );
  }


  update( container ){
    let childList = container.children;
    let codeNodes = [...childList].filter(node => node.nodeName === "CODE");


    for (let i = 0; i < codeNodes.length; i++){
      const title = codeNodes[i].title;
      const block = GUIDANCES[ this.#opening[i] ];

      if ( block === undefined ){
        this.#opening.push( GUIDANCES.findIndex(([code, id]) => id === title) );
        continue;
      }


      if ( block[1] === title )
        continue;

      // swipe
      if ( block[1] !== title ) {
        let swipeIndex = this.#opening.findIndex( index => GUIDANCES.at(index)[1] === title );
        this.#opening[i] = this.#opening.splice(swipeIndex, 1, this.#opening[i]).at(0);
      }

    }

    localStorage.setItem("guidances", JSON.stringify(this.#opening));
  }


  static BASIC_GUIDANCES = [0, 1, 2, 3, 4];
}




class Discoveries {
  constructor({ library, container }){
    this.library   = library;
    this.container = container;

    let opening = library.manager.getOpening();
    let unavailable = GUIDANCES.filter( (e, i) => !opening.includes(i) )
      .slice(0, 3);

    this.buttons = unavailable.map(([code, title]) => {
      let node = document.createElement("div");
      node.textContent = title;
      node.title = "Нажмите, чтобы открыть";
      return node;
    });
  }


  checkReady(count){
    let target = this.library.manager.getSymbolsTarget();
    if (count < target)
      this.lacks = target - count;

    return this;
  }


  init(){
    if ("lacks" in this)
      return this.displayLacks();

    let isMaximum = this.library.manager.getOpening().length === GUIDANCES.length;
    if (isMaximum)
      return;

    this.clickHandler = this.#clickHandler.bind(this, this.library);
    this.container.addEventListener("click", this.clickHandler);
    this.buttons.forEach(node => this.container.append(node));
  }


  displayLacks(){
    let node = document.createElement("span");
    node.textContent = `Напишите ещё ${ ending(this.lacks, "символ", "ов", "", "а") }, чтобы открыть новые подсказки`;
    this.container.append(node);
  }


  #clickHandler(library, clickEvent){
    if (clickEvent.target.nodeName === "SECTION")
      return;

    this.container.removeEventListener("click", this.clickHandler);

    this.container.innerHTML = "";
    let index = GUIDANCES.findIndex(([code, title]) => title === clickEvent.target.textContent);

    if (!~index)
      throw new Error("unknow Title");

    let codesBlocks = library.container.querySelector("#codesBlocks");

    library.addCodeBlocks(codesBlocks, [index]);
    library.manager.update( codesBlocks );

    library.checkDiscoverises(this.container, library.symbolsCount);
  }

  static HTML = `
      <center>Хорошо подумайте перед тем, как что-то выбрать</center>
      { buttons }
  `;
}
