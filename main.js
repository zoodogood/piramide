// Предупреждения консоли даже невозможно отловить. Пусть это и костыль, но им пользуется половина интернета
console.warn = () => {}

// Всплывающее сообщение
Alert.create("<b>Игра Пирамидка ⛊</b><br><small>Напишите алгоритм, чтобы решить простую задачу</small><br>Вы всегда можете <a href = '#' onclick = 'window.scrollTo({top: window.innerHeight, behavior: \"smooth\"});'>прокрутить</a> вниз страницы, чтобы прочитать короткую документацию или просмотреть основной код игры и её правила", "success", "Помощник");


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
