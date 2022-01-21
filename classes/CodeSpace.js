
let codeareaStyle = document.createElement("link");
codeareaStyle.href = `./resources/highlight/styles/${ params.codeSyntax }.min.css`;
codeareaStyle.rel  = "stylesheet";
document.body.append(codeareaStyle);

const codespace = document.querySelector("#code-space");
const codearea = codespace.children.item(1);


// Заполняет код
function setCode(){
  codearea.textContent = localStorage.getItem("userCode") || defaultCode();
  hljs.highlightElement(  codearea  );
}
setCode();


const stretch = codespace.children.item(0);
// Элемент можно тянуть изменяя его высоту
stretch.addEventListener("mousedown", async () => {

  let moveListener = (e) =>
    codearea.style.height = `${window.innerHeight - e.pageY - 50}px`;


  document.addEventListener("mousemove", moveListener);

  await new Promise(res => document.addEventListener("mouseup", res, {once: true}));
  document.removeEventListener( "mousemove", moveListener );
});





// При клике окрашивать синтаксис
document.addEventListener("mousedown", e => {
  if ( e.path.includes(codearea) )
    return;

  hljs.highlightElement(  codearea  );
});





// Поддержка Таба и Enter внутри Codearea
codearea.addEventListener("keydown", e => {
  if (e.key !== "Tab" && e.key !== "Enter")
    return;

  if (e.key === "Enter" && e.ctrlKey)
    return;


  const key = {Enter: "\n", Tab: "  "}[e.key];


  const selection = window.getSelection();
  let prev = selection.baseNode.nodeValue.substring(0, selection.baseOffset);
  let end  = selection.baseNode.nodeValue.substring(selection.baseOffset);

  selection.baseNode.nodeValue = `${  prev  }${ key }${  end  }`;

  const range = document.createRange();
  range.selectNodeContents( selection.baseNode );
  range.collapse(false);

  range.setStart( selection.baseNode, `${  prev  }${ key }`.length );
  range.setEnd  ( selection.baseNode, `${  prev  }${ key }`.length );


  selection.removeAllRanges();
  selection.addRange(range);


  //

  e.preventDefault();
});




// ---- Кнопки

class Button {
  constructor(id, func){
    this.button = document.getElementById(id);
    this.func   = func;

    this.button.addEventListener("click", clickEvent => {
      gtag("event", `${ id }_pressed`);
      this.func(clickEvent);
    });
  }


  hideIt(func){
    if ( func() )
      this.button.style.display = "none";

    return this;
  }
}


new Button("play-button", e => {
  launch();
});


new Button("scoreMap-button", e => {
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
    dots: JSON.parse(localStorage.getItem("poligonLog") || "[]")
      .map(({ timestamp: x, details: y }) => ({x, y}))
  });

}).hideIt(() => !params.activatePoligon);


new Button("copy-button", e => {
  Alert.create("Весь код был скопирован в Ваш буфер обмена");
  navigator.clipboard.writeText( codearea.textContent );
});


new Button("setDefault-button", e => {
  codearea.textContent = defaultCode();
  hljs.highlightElement(  codearea  );
});


new Button("showHelps-button", e => {
  let modalWindow = new ModalWindow({size: {width: 690, height: 490}});

  let container = document.createElement("main");
  modalWindow.element.append(container);

  let symbolsCount = codearea.textContent.length;

  new Library({ container, symbolsCount });

}).hideIt(() => params.removeLibrary);





function defaultCode(){
  return `
const game = new Game({ size: 15, count: 3 }).visualize();

// Перемещает верхнюю плитку от первой башенки к третьей башне
game.step(0, 2);


console.log( game.list );
 `;
}


codearea.addEventListener("input", e => {
  localStorage.setItem("userCode", codearea.textContent);
});



document.addEventListener("keydown", e => {
  if (e.code !== "Enter" || !e.ctrlKey)
    return;

  document.querySelector("#play-button").click();
  e.preventDefault();
});


document.addEventListener("keydown", e => {
  if (document.activeElement !== codearea)
    return;

  if (e.code !== "Escape")
    return;

  codearea.blur();
  e.preventDefault();
});
