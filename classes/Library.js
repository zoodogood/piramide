const GUIDANCES = [
  [ i18n("library-advice-#0-advice"),  i18n("library-advice-#0-title")  ],
  [ i18n("library-advice-#1-advice"),  i18n("library-advice-#1-title")  ],
  [ i18n("library-advice-#2-advice"),  i18n("library-advice-#2-title")  ],
  [ i18n("library-advice-#3-advice"),  i18n("library-advice-#3-title")  ],
  [ i18n("library-advice-#4-advice"),  i18n("library-advice-#4-title")  ],
  [ i18n("library-advice-#5-advice"),  i18n("library-advice-#5-title")  ],
  [ i18n("library-advice-#6-advice"),  i18n("library-advice-#6-title")  ],
  [ i18n("library-advice-#7-advice"),  i18n("library-advice-#7-title")  ],
  [ i18n("library-advice-#8-advice"),  i18n("library-advice-#8-title")  ],
  [ i18n("library-advice-#9-advice"),  i18n("library-advice-#9-title")  ],
  [ i18n("library-advice-#10-advice"), i18n("library-advice-#10-title") ],
  [ i18n("library-advice-#11-advice"), i18n("library-advice-#11-title") ],
  [ i18n("library-advice-#12-advice"), i18n("library-advice-#12-title") ],
  [ i18n("library-advice-#13-advice"), i18n("library-advice-#13-title") ]
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

    return ;
  }


  checkDiscoverises(container, count){
    new Discoveries({ library: this, container })
      .checkReady(count)
      .init();
  }


  static HTML = `
    <span><small>${ i18n("library-container-message") }</small></span>
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
      return ~~( Math.pow(1.22106, this.#opening.length + 1) * 65 );
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
    node.textContent = i18n("library-container-lacks", this.lacks);
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
      <center>${ i18n("library-container-take")}</center>
      { buttons }
  `;
}
