// Предупреждения консоли даже невозможно отловить. Пусть это и костыль, но им пользуется половина интернета
console.warn = () => {}

// Всплывающее сообщение
Alert.create("<b>Игра Пирамидка ⛊</b><br><small>Напишите алгоритм, чтобы решить простую задачу</small><br>Подробнее <a href = '#' onclick = 'window.scrollTo({top: window.innerHeight, behavior: \"smooth\"});'>снизу</a> страницы", "success", "Привет!");


// Скролл вверх страницы при запуске
window.scrollTo({top: 0, behavior: "smooth"});


// Новая, быстрая и плавная прокрутка
document.addEventListener("wheel", e => {
  let difference = -e.deltaY;

  if (document.activeElement === codearea)
    return;

  if (e.shiftKey)
    return;

  e.preventDefault();

  window.scrollTo({
    top: difference < 0 ? window.innerHeight : 0,
    behavior: "smooth"
  });
}, {passive: false});



// Срабатывает кнопкой Пуск или нажатием пробела
async function launch(){
  if (params.clearedConsole)
    console.clear();

  try {
    await eval(`(async () => {${codearea.textContent}})()`);
  } catch (err) {
    Alert.create(err.message, "error", "Просто ошибка");
    console.error(err);
  }
}

if ( !window.location.href.includes("ignore") ){
  launch();
}



if (params.background)
  document.body.style.background = params.background;
