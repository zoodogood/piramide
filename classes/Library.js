const GUIDANCE = [

]


class Library {
  constructor({ container, length = 15 }){
    this.container = container;
    container.classList.add("library-container");
    let guidances = 123;
    container.innerHTML = this.constructor.HTML.replace("{guidances}", guidances);

    container.querySelectorAll("code")
      .forEach(hljs.highlightElement);
  }

  static HTML = `
    <span><small>Примеры кода нельзя скопировать. T_T<br>Ручное написание положительно влияет на понимание того, что Вы делаете.</small></span>
    <br>
    <code draggable ondragstart = "console.log(123)">const NEW_YEAR = "31.12";</code>
    <code draggable>// Обычное условие\nwhile ( !!!NEW_YEAR ){\n  alert("Скоро всё случится");\n}</code>
    <code>console.log("С наступающим");</code>
    <code draggable>// Совет:\nСтремитесь разобраться в том,\nчто из себя представляет каждая переменная; что делает та или иная функция...</code>
    <br>
    <hr>
    <center>Напишите ещё С Новым Годом кода, чтобы открыть новые подсказки</center>
  `

  static getSymbolsCount = (openedCount) => 45 * openedCount;
}
