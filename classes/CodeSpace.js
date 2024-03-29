
let codeareaStyle = document.createElement("link");
codeareaStyle.href = `./resources/highlight/styles/${ userParams.codeSyntax }.min.css`;
codeareaStyle.rel  = "stylesheet";
document.body.append(codeareaStyle);

const codespace = document.querySelector("#code-space");
const codearea = codespace.children.item(1);






// ---- Кнопки

class Button {
  constructor(id, func){
    this.button = document.getElementById(id);
    this.func   = func;

    this.button.addEventListener("click", clickEvent => {
      if (this.button.hasAttribute("disabled")){
        return;
      }
      
      gtag("event", `${ id }_pressed`);
      this.func(clickEvent);
    });
  }


  hideIt(callback){
    if ( callback() === true )
      this.button.style.display = "none";

    return this;
  }
}


new Button("play-button", clickEvent => {
  launch();
});


new Button("scoreMap-button", clickEvent => {
  let modalWindow = new ModalWindow({size: { width: 640, height: 350, minWidth: 350, minHeight: 350 }});
  let container = document.createElement("main");

  container.classList.add("linearGraph-container");
  modalWindow.element.append(container);

  let graph = new LinearGraph();
  graph.setDisplayDots((dot) => {
    let date = new Intl.DateTimeFormat("ru-ru", {year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"}).format(dot.x);
    return `Шагов: ${ dot.y }\n${ date }`;
  });

  graph.init({
    container: container,
    dots: localDB.getItem("poligonLog", {default: []})
      .map(({ timestamp: x, details: y }) => ({x, y}))
  });

}).hideIt(() => !userParams.activatePoligon);


new Button("copy-button", clickEvent => {
  Alert.setDelayMultiplayer(1);
  Alert.create("Весь код был скопирован в Ваш буфер обмена");
  navigator.clipboard.writeText( codearea.textContent );
});


new Button("showConsole-button", clickEvent => {
  let modalWindow = new ModalWindow({size: {width: 790, height: 620}});

  let container = document.createElement("main");
  modalWindow.element.append(container);

  new Console({ container });

}).hideIt(() => !userParams.alternativeConsole);


new Button("setDefault-button", clickEvent => {
  if ( !confirm("Точно восстановить код по умолчанию?\nВсе несохраненные данные будут удалены.") )
    return;

  codearea.textContent = defaultCode();
  hljs.highlightElement(  codearea  );
});


new Button("showHelps-button", clickEvent => {
  let modalWindow = new ModalWindow({size: {width: 690, height: 490}});

  let container = document.createElement("main");
  modalWindow.element.append(container);

  let symbolsCount = codearea.textContent.length;

  new Library({ container, symbolsCount });

}).hideIt(() => userParams.removeLibrary);

















// Заполняет код
function setCode(){
  codearea.textContent = localDB.getItem("userCode", {default: defaultCode()});
  hljs.highlightElement(  codearea  );
}
setCode();


// Элемент можно тянуть изменяя его высоту
const stretch = codespace.children.item(0);

stretch.addEventListener("mousedown", async () => {
  const styleTarget = document.querySelector("body > main").style;

  const moveListener = (clickEvent) => {
    const value = Math.max(0, window.innerHeight - clickEvent.pageY - 50);
    styleTarget.setProperty("--codeSpace-code-height", `${ value }px`);
  }


  document.addEventListener( "mousemove", moveListener );

  await new Promise(res => document.addEventListener("mouseup", res, { once: true }));
  document.removeEventListener("mousemove", moveListener);
  
  const current = styleTarget.getPropertyValue("--codeSpace-code-height");
  const isHided = current === "0em";
  if (isHided) {
    return;
  }

  
  
  Params.setValue("codeareaHeight", styleTarget.getPropertyValue("--codeSpace-code-height"), {forceSave: true});
});


stretch.addEventListener("dblclick", () => {
  const styleTarget = document.querySelector("body > main").style;
  const current = styleTarget.getPropertyValue("--codeSpace-code-height");
  const isHided = current === "0em";

  styleTarget.setProperty("--codeSpace-code-height", isHided ? Params.getValue("codeareaHeight") : "0em");
})



codearea.addEventListener("blur", focusEvent => {
  [...codearea.children]
    .filter(node => node.tagName === "DIV")
    .forEach(node => node.textContent += "\n");

  codearea.textContent = codearea.textContent;
  hljs.highlightElement(  codearea  );
});

document.addEventListener("keydown", keyEvent => {

  if (!keyEvent.ctrlKey)
    return;

  if (keyEvent.code !== "KeyS")
    return;

  keyEvent.preventDefault();
});





// Поддержка Таба и Enter внутри Codearea
codearea.addEventListener("keydown", keyEvent => {
  const symbol = {
    Enter: "\n",
    Tab:   "  "
  }[keyEvent.key];

  if (symbol === undefined)
    return;

  if (keyEvent.key === "Enter" && keyEvent.ctrlKey)
    return;



  const selection = window.getSelection();

  let prev = "", end = "";
  if (selection.baseNode.nodeValue !== null){
    prev = selection.baseNode.nodeValue.substring(0, selection.baseOffset);
    end  = selection.baseNode.nodeValue.substring(selection.baseOffset);
  }

  // костыль
  if (symbol === "\n" && end === "")
    symbol = "\n\n";

  selection.baseNode.nodeValue = `${  prev  }${ symbol }${  end  }`;


  const range = document.createRange();
  range.selectNodeContents( selection.baseNode );
  range.collapse(false);

  const position = prev.length + symbol.length;
  range.setStart( selection.baseNode, position);
  range.setEnd  ( selection.baseNode, position);


  selection.removeAllRanges();
  selection.addRange(range);



  keyEvent.preventDefault();
});





function defaultCode(){
  return `
const game = new Game({ size: 15, count: 3 }).visualize();

// ${ i18n("codeSpace-default-code-comment-game-step") }
game.step(0, 2);

const towers = game.state;
console.log( towers );
 `;
}


codearea.addEventListener("input", () => {
  localDB.setItem("userCode", codearea.textContent, {forceSave: true});
});



document.addEventListener("keydown", keyEvent => {
  if (keyEvent.code !== "Enter" || !keyEvent.ctrlKey)
    return;

  document.querySelector("#play-button").click();
  keyEvent.preventDefault();
});


document.addEventListener("keydown", keyEvent => {
  if (document.activeElement !== codearea)
    return;

  if (keyEvent.code !== "Escape")
    return;

  codearea.blur();
  keyEvent.preventDefault();
});
