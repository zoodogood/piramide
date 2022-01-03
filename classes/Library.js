const GUIDANCES = [
  [`const NEW_YEAR = "31.12";`, "Be Happy"],
  [`// ---------------------- { } ----------------------\nВ этом меню Вы сможете найти как примеры небольшого кода,\nтак и советы которые помогут разобраться с написанием алгоритма.\nПлитки с подсказками можно перетаскивать, чтобы выделять главное.\nПопробуйте переместить этот совет в самый низ списка\n// -------------------------------------------------`, "Как приручить дракона"],
  [`// Однозначно стоит понимать какие данные у Вас есть.\n\n// Массив башен\nlet towers = game.list;\nlet secondTower = towers.at(1);\n// Каждая башня — массив плит\nlet slab = secondTower.at(0);`, "мяу"],
  [`// Чтобы перемещать плитки используются номера башен и функция \`step\`\ngame.step(1, 2);`, "Перемещение"],
  [`// Пока истина — учись.\nwhile (true) learn();`, "Первое условие"],
  [`console.log("С наступающим");`, "Вывод в консоль"],
  [`// Совет:\nСтремитесь разобраться в том,\nчто из себя представляет каждая переменная; что делает та или иная функция...`, "Первый совет"],
  [`123`, "Как понять, что перед вами переменная"]
];


class Library {
  constructor({ container }){
    this.container = container;
    container.classList.add("library-container");

    this.manager = new GuidancesManager();

    container.innerHTML = this.constructor.HTML
      .replace( "{ guidances }", this.getGuidances() )
      // .replace( "{discoveries}", this.getDiscoveriesHTML() );

    container.querySelectorAll("code")
      .forEach(hljs.highlightElement);

    this.addDraggableHandlers();
  }


  getGuidances(){
    let codes = [];
    let opening = this.manager.getOpening();

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


    return new DiscoveriesHTML();
  }


  static HTML = `
    <span><small>Примеры кода нельзя скопировать. T_T<br>Ручное написание положительно влияет на понимание того, что Вы делаете.</small></span>
    <br>
    { guidances }
    <br>
    { discoveries }
    <hr>
    <center>Напишите ещё { symbolsNeeded }, чтобы открыть новые подсказки</center>
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


  getSymbolsTarget(count){
    return Math.pow(1.16719, this.#opening.length + 1) * 50;
  }


  update( container ){
    let childList = container.children;
    let codeNodes = [...childList].filter(node => node.nodeName === "CODE");


    for (let i in codeNodes){
      const title = codeNodes[i].title;
      const block = GUIDANCES.at( this.#opening[i] );

      if ( block[1] === title )
        continue;

      if ( block === undefined )
        this.#opening.push( GUIDANCES.findIndex(([code, id]) => id === title) );

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




class DiscoveriesHTML {
  constructor(){

  }


  clickHandler(){
    console.log(123);
  }

  static HTML = `
    <section onclick = "" class = "library-discoveries">
      { buttons }
    </section>
  `;
}
