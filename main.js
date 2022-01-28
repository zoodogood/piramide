// Предупреждения консоли даже невозможно отловить. Пусть это и костыль, но им пользуется половина интернета
console.warn = () => {}

// Всплывающее сообщение
Alert.create("<b>Игра Пирамидка ⛊</b><br><small>Напишите алгоритм, чтобы решить простую задачу</small><br>Подробнее <a href = '#' onclick = 'window.scrollTo({top: window.innerHeight, behavior: \"smooth\"});'>внизу</a> страницы", "success", "Привет!");



// Скролл вверх страницы при запуске
window.scrollTo({top: 0, behavior: "smooth"});


// Новая, быстрая и плавная прокрутка
document.addEventListener("wheel", wheelEvent => {

  if (wheelEvent.deltaY === 0)
    return;

  if (wheelEvent.shiftKey)
    return;

  let isDirectionTop = wheelEvent.deltaY < 0;

  let targetWithScroll = wheelEvent.path
    .find(node => {
      if (node.clientHeight === node.scrollHeight)
        return;

      let isCanScroll = isDirectionTop ?
        node.scrollTop !== 0 :
        node.scrollTop !== node.scrollHeight - node.clientHeight;

      return isCanScroll;
    });

  if (targetWithScroll !== document.documentElement)
    return;


  if (targetWithScroll.scrollTop > window.innerHeight)
    return;

  wheelEvent.preventDefault();


  window.scrollTo({
    top: isDirectionTop ? 0 : window.innerHeight,
    behavior: "smooth"
  });
}, {passive: false});



// Срабатывает кнопкой Пуск или нажатием пробела
async function launch(){
  if (params.clearedConsole)
    console.clear();

  window.events.emit("launchCode");

  try {
    await eval(`(async () => {${codearea.textContent}})()`);
  }
  catch (err) {
    Alert.create(err.message, "error", "Просто ошибка");
    console.error(err);
    window.events.emit("error", err);
  }

  window.events.emit("launchCodeEnd");
}

if ( !window.location.href.includes("ignore") && crashDefender.check() )
  launch();


if ( "codeareaHeight" in localStorage )
  document.querySelector("#code-area").style.height = localStorage.getItem("codeareaHeight");



if (params.background)
  document.body.style.background = params.background;


if (params.menuButtonsColor)
  document.documentElement.style.setProperty('--mainThemeColor', `hsl(${ params.menuButtonsColor }, 35%, 55%)`);


if (params.codeSize)
  document.documentElement.style.setProperty('--codeFontSize', `${ params.codeSize }em`);



(async () => {
  if (!params.letItSnow)
    return;

  let element = document.createElement("script");
  element.src  = `./classes/LetItSnow.js`;
  element.id   = "LetItSnow";
  document.body.append(element);
  await new Promise(res => (element.onload = res));

  new SnowBackground();
})();
