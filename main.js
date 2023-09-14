// Предупреждения консоли даже невозможно отловить. Пусть это и костыль, но им пользуется половина интернета
console.warn = () => {}





// Всплывающее сообщение
Alert.create(`<b>${ i18n("main-alert-name") }</b><br><small>${ i18n("main-alert-description") }</small><br>${ i18n("main-alert-detail", `window.scrollTo({top: window.innerHeight, behavior: "smooth"});`) }`, "success", i18n("main-alert-title-hello"));



// Скролл вверх страницы при запуске
window.scrollTo({top: 0, behavior: "smooth"});


// Новая, быстрая и плавная прокрутка
document.addEventListener("wheel", wheelEvent => {

  if (userParams.disableCustomScroll)
    return;

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

      if (!isCanScroll)
        return;

      let overflowType = window.getComputedStyle(node)["overflow-y"];
      return !["", "hidden", "visible"].includes( overflowType );
    });


  if (targetWithScroll !== document.documentElement)
    return;


  if (targetWithScroll.scrollTop > window.innerHeight)
    return;

  if (targetWithScroll.scrollTop === window.innerHeight && !isDirectionTop)
    return;

  wheelEvent.preventDefault();


  window.scrollTo({
    top: isDirectionTop ? 0 : window.innerHeight,
    behavior: "smooth"
  });
}, {passive: false});



// Срабатывает кнопкой Пуск или нажатием пробела
async function launch(){
  if (userParams.clearedConsole)
    console.clear();

  window.events.emit("launchCode");
  localDB.setItem("statistic.launch", (current) => current + 1);

  try {
    await eval(`(async () => {${codearea.textContent}})()`);
  }
  catch (err) {
    Alert.create(err.message, "error", i18n("main-alert-title-error"));
    console.error(err);
    window.events.emit("error", err);
    localDB.setItem("statistic.launchEndWithError", (current) => current + 1);
  }

  window.events.emit("launchCodeEnd");
}


if ( !window.location.href.includes("ignore") && userParams.launchOnStart && crashDefender.check() )
  launch();


if (userParams.codeareaHeight)
  document.querySelector("body > main").style.setProperty("--codeSpace-code-height", userParams.codeareaHeight);



if (userParams.background)
  document.body.style.background = userParams.background;


if (userParams.menuButtonsColor)
  document.documentElement.style.setProperty('--mainThemeColor', `hsl(${ userParams.menuButtonsColor }, 35%, 55%)`);


if (userParams.codeSize)
  document.documentElement.style.setProperty('--codeFontSize', `${ userParams.codeSize }em`);

if (localDB.getItem("statistic?.win") > 0){
  document.querySelector("#game").classList.add("post-initial");
}

(async () => {
  if (!userParams.letItSnow)
    return;

  let element = document.createElement("script");
  element.src  = `./classes/LetItSnow.js`;
  element.id   = "LetItSnow";
  document.body.append(element);
  await new Promise(res => (element.onload = res));

  new SnowBackground();
})();


window.events.emit("main");


I18nManager.replaceAll();
