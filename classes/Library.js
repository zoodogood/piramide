const GUIDANCES = [
  [`const NEW_YEAR = "31.12";`, "Строка"],
  [`// ---------------------- { } ----------------------\nВ этом меню Вы сможете найти примеры небольшого кода,\nкоторые помогут разобраться с написанием алгоритма.\nПеретаскивайте плитки с подсказками, чтобы выделить главное.\nПопробуйте переместить этот совет в самый низ списка\n// -------------------------------------------------`, "Как приручить дракона"],
  [`// Как стоит представлять понятия башни и списка:\nlet tower = [7, 12, 3];\nlet list = [tower, tower1, tower2];`, "Массивы"],
  [`// Доступные данные\n\n// Массив башен\nlet towers = game.list;\nlet secondTower = towers.at(1);\n// Каждая башня — массив плит\nlet slab = secondTower.at(0);`, "мяу"],
  [`// Чтобы перемещать плитки используются номера башен и функция \`step\`\ngame.step(1, 2);`, "Перемещение"],
  [`// Вывести каждый элемент башни\nwhile (i < tower.length){\n  console.log( tower.at(i) );\n  i++;\n}`, "Перебор циклом"],
  [`// НАЙТИ БАШНЮ С ПЛИТКОЙ РАЗМЕРОМ 15;\nfunction findTower(slab){\n  let i = 0;\n  while (i < list.length){\n    let tower = list.at(i);\n    let isIncludes = tower.includes(slab);\n\n    if (isIncludes)\n      return tower;\n\n    i++;\n  }\n}\n\nlet tower = findTower(15);`, "Башня с плиткой нужного размера"],
  [`console.log("С наступающим");`, "Вывод в консоль"],
  [`// Совет:\nСтремитесь разобраться в том,\nчто из себя представляет каждая переменная; что делает та или иная функция...`, "Первый совет"],
  [`// Пока истина — учись.\nwhile (true) learn();`, "Первое условие"],
  [`Вы достигли конца библиотеки 🔥\n/*\n░▄▀▀▀▀▄░░▄▄\n█░░░░░░▀▀░░█░░░░░░▄░▄\n█░║░░░░██░████████████\n█░░░░░░▄▄░░█░░░░░░▀░▀\n░▀▄▄▄▄▀░░▀▀\n*/`, "Откройте достижение"]
];


class Library {
  constructor({ container, symbolsCount }){
    this.container = container;
    this.symbolsCount = symbolsCount;
    container.classList.add("library-container");

    this.manager = new GuidancesManager();

    container.innerHTML = this.constructor.HTML
      .replace( "{ guidances }", this.getGuidancesHTML( this.manager.getOpening() ) )
      .replace( "{ discoveries }", this.getDiscoveriesHTML( this.symbolsCount ) )
      .replace( "{ symbolsNeeded }", this.displayTargetHTML() );

    this.handleElements();
    this.addDraggableHandlers();
  }


  handleElements(){
    this.container.querySelectorAll("code")
      .forEach(hljs.highlightElement);

    this.container.querySelector(".library-discoveries")
      ?.addEventListener("click", this.manager.discoveries.clickHandler.bind(this));
  }


  getGuidancesHTML(opening = []){
    let codes = [];

    for (let index of opening)
      codes.push( GUIDANCES.at( index ) );


    let inner = codes.map(([code, title]) => `<code title = "${ title }">${ code }</code>`)
      .join("\n");

    return inner;
  }


  addDraggableHandlers(){
    const isCode = (node) => node.nodeName === "CODE" && this.container.contains(node);
    const swipeBlocks = (node, targetNode) => {
      let next = targetNode.nextElementSibling;

      if (next === node)
        next = next.previousElementSibling;

      this.container.insertBefore(targetNode, node);
      this.container.insertBefore(node, next);

      this.manager.update( this.container );
    }

    let ephemeral, codeNode;

    const moveHandler  = (mouseEvent) => {
      let { x: containerX, y: containerY } = this.container.getBoundingClientRect();
      containerY -= this.container.scrollTop;

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




    this.container.addEventListener("mousedown", async mouseEvent => {
      codeNode = mouseEvent.path.find(isCode);
      if (!codeNode)
        return;

      ephemeral = codeNode.cloneNode(true);
      ephemeral.classList.add("ephemeral");
      this.container.append(ephemeral);

      codeNode.classList.add("dragged");

      this.container.addEventListener("mousemove", moveHandler);
      this.container.addEventListener("mouseover", enterHandler);
      this.container.addEventListener("mouseout",  leaveHandler);


      let mouseUpEvent = await new Promise(res => document.body.addEventListener("mouseup", res, {once: true}));


      this.container.removeEventListener("mousemove", moveHandler);
      this.container.removeEventListener("mouseover", enterHandler);
      this.container.removeEventListener("mouseout",  leaveHandler);

      codeNode.classList.remove("dragged");
      ephemeral.remove();

      let targetNode = mouseUpEvent.path.find(isCode);
      if (!targetNode || targetNode === codeNode)
        return;

      targetNode.classList.remove("dragzone");
      swipeBlocks(codeNode, targetNode);
    });
  }


  getDiscoveriesHTML(count){
    let target = this.manager.getSymbolsTarget();
    if (target > count)
      return "";

    this.manager.discoveries = new Discoveries(this.manager, count);
    return this.manager.discoveries.toHTML();
  }


  displayTargetHTML(){
    let target = this.manager.getSymbolsTarget() - this.symbolsCount;

    if (target < 0)
      return "";

    if (this.manager.getOpening().length === GUIDANCES.length)
      return "";

    return `<center>Напишите ещё ${ ending(target, "символ", "ов", "", "а") }, чтобы открыть новые подсказки</center>`
  }


  static HTML = `
    <span><small>Примеры кода нельзя скопировать. T_T<br>Ручное написание положительно влияет на понимание того, что Вы делаете.</small></span>
    <br>
    { guidances }
    <br>
    { discoveries }
    <hr>
    { symbolsNeeded }
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
  constructor(manager){
    let unavailable = GUIDANCES.filter((e, i) => !manager.getOpening().includes(i))
      .slice(0, 3);

    this.buttons = unavailable.map(([code, title]) => `<div title = "Нажмите, чтобы открыть">${ title }</div>`);
  }


  toHTML(){
    if (!this.buttons)
      return "";

    let buttons = this.buttons;
    return this.constructor.HTML
      .replace("{ buttons }", buttons.join("\n"));
  }


  clickHandler(clickEvent){
    if (clickEvent.target.nodeName === "SECTION")
      return;

    let library = this;
    library.container.querySelector(".library-discoveries").remove();
    let index = GUIDANCES.findIndex(([code, title]) => title === clickEvent.target.textContent);

    if (!~index)
      throw new Error("unknow Title");

    let inner = library.getGuidancesHTML([index]);
    library.container.querySelector("code:last-of-type").insertAdjacentHTML("afterend", inner);

    hljs.highlightElement(library.container.querySelector("code:last-of-type"));
    library.manager.update( library.container );
  }

  static HTML = `
    <section class = "library-discoveries">
      { buttons }
    </section>
  `;
}
