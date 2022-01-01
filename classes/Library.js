const GUIDANCE = [

]


class Library {
  constructor({ container }){
    this.container = container;
    container.classList.add("library-container");

    this.manager = new GuidancesManager();

    container.innerHTML = this.constructor.HTML
      .replace( "{ guidances }", this.getGuidances() )
      // .replace( "{discoveries}", this.checkDiscoveries( symbolsCount ).toHTML() );

    container.querySelectorAll("code")
      .forEach(hljs.highlightElement);

    this.addDraggableHandlers();
  }


  getGuidances(){
    let opening = localStorage.getItem("guidances") || this.manager.constructor.BASIC_GUIDANCES;
    let codes = [];

    for (let index of opening)
      codes.push(  this.manager.constructor.GUIDANCES.at( index )  )


    let inner = codes.map(([code, title]) => `<code title = "${ title }">${ code }</code>`)
      .join("\n");

    return inner;
  }


  addDraggableHandlers(){
    const isCode = (node) => node.nodeName === "CODE" && this.container.contains(node);
    const swipeBlocks = (node, targetNode) => {
      let next = targetNode.nextElementSibling;
      this.container.insertBefore(targetNode, node);
      this.container.insertBefore(node, next);
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

  setSymbolsCount(){

  }


  static GUIDANCES = [
    [`const NEW_YEAR = "31.12";`, "Be Happy"],
    [`// Обычное условие\nwhile ( !!!NEW_YEAR ){\n  alert("Скоро всё случится");\n}`, "Первое условие"],
    [`console.log("С наступающим");`, "Вывод в консоль"],
    [`// Совет:\nСтремитесь разобраться в том,\nчто из себя представляет каждая переменная; что делает та или иная функция...`, "Первый совет"],
    [`123`, "Как понять, что перед вами переменная"]
  ]

  static BASIC_GUIDANCES = [0,1,2];

  static getSymbolsCount = (openedCount) => 45 * openedCount;
}
