
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


// При каждом клике окрашивать синтаксис
document.addEventListener("mousedown", e => {
    hljs.highlightElement(  codearea  );
});

// Поддержка Таба и Enter внутри Codearea
document.addEventListener("keydown", e => {
  if (e.key !== "Tab" && e.key !== "Enter")
    return;

  if (e.key === "Enter" && e.shiftKey)
    return;

  let sel = window.getSelection();
  console.log(sel);

  e.preventDefault();
});




// ---- Кнопки

function copyAllCode(){
  Alert.create("Весь код был скопирован в Ваш буфер обмена");
  navigator.clipboard.writeText( codearea.textContent );
}


function defaultCode(){
  return `
    const game = new Game({size: 15, count: 3}).visualize();

    // Перемещает верхнюю плитку от первой башенки к третьей башне
    game.step(0, 2);

    console.log( game.list );
  `;
}

function setDefaultCode(){
  codearea.textContent = defaultCode();
  hljs.highlightElement(  codearea  );
}

function checkScoreMap(){
  // Alert.create("Загляните в консоль.</br>Там статистика!");
  navigator.clipboard.writeText( codearea.textContent );
  console.log( localStorage.getItem("scoreMap") );
  Alert.create("Ещё не готово</br>19.12", "warning", ":(");
}


codearea.addEventListener("input", e => {
  localStorage.setItem("userCode", codearea.textContent);
});



document.addEventListener("keydown", e => {
  if (document.activeElement === codearea)
    return;

  if (e.code !== "Space")
    return;

  launch();
  e.preventDefault();
});
