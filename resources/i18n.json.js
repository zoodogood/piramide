globalThis.i18nLanguages = {
	ua: {
		"game-title": "Схоже, тут пусто.<br><small>Натисніть Грати</small>",

		"main-alert-title-hello": "Привіт",
		"main-alert-name": "Гра Пірамідка ⛊",
		"main-alert-description": "Напишіть алгоритм, щоб вирішити просту задачу",
		"main-alert-detail":
			"*Дізнатися більше <a href = 'javascript:void(0);' onclick = '${ replaces.at(0) }'>знизу</a> сторінки",

		"main-onLaunch-console-gameStart": "🦝 Гра запущена",
		"main-onLaunch-console-message":
			"Все, що попадає до console.log — буде відображатися тут!",

		"codeSpace-controlButtons-play": "Грати",
		"codeSpace-controlButtons-scoreMap": "Графік эфектив.",
		"codeSpace-controlButtons-copy": "Копіювати",
		"codeSpace-controlButtons-showConsole": "Консоль",
		"codeSpace-controlButtons-setDefault": "Відновити код",
		"codeSpace-controlButtons-showHelps": "Біблиотека",

		"codeSpace-default-code-comment-game-step": `Переміщує найвищу плитку вежі "один" до вежі "три"`,

		"footer-article-h1": "Пояснення задачі",
		"footer-article-taskInfo": `Напишіть алгоритм, щоб зібрати всі плитки всередині одного масиву, вежі.<br>
       Для їх переміщення використовуйте метод класа: <code>game</code> — <code>step()</code>,<br>
       який приймає два аргументи: номер масиву з якого перенести плитку і того, в котрий її перенести.<br>
       Отримати масив веж — <code>game.state</code>`,

		"footer-advice-h2": "Прочитайте",
		"footer-advice-#1": "Шукайте в Інтернеті те, що Вам цікаво.",
		"footer-advice-#2": `Відвідайте <a title = "Github" href = "https://github.com/zoodogood/piramide" target="_blank"><span class = "icon">g</span> сторінку Гітхаба.</a>`,
		"footer-advice-#3":
			"Використовуйте консоль розробника (за умовчанням F12) Це допоможе отримати інформацію про процес виконання вашого алгоритму.",
		"footer-advice-#4":
			"Пам'ятайте, Ваш код та статистика зберігаються навіть при перезавантаженні сторінки.",
		"footer-advice-#5":
			"Обережніше з безкінечними циклами, їх умова завжди вірна. Зависання сторінки — явний знак такого циклу.",
		"footer-advice-settings": "Змініть налаштування",

		"footer-bottom-hidden": "Самий час нажати *Ctrl + Enter*",

		"alert-title-error": "Просто помилка",
		"visualizer-tower-tip": "Вежа, яку треба зібрати",
		"remove-element": "Прибрати елемент",

		"settings-panel-save": "Зберегти",
		"settings-panel-restore": "Скасувати",

		"settings-sections-details": "Докладніше",
		"settings-sections-preview": "Перегляд",
		"settings-sections-experimentalFeature": "Експеріментальна функція*",

		"settings-section-main": "Основне:",

		"settings-action-launchOnStart-h2":
			"Вмикати алгоритм при завантаженні сторінки",
		"settings-action-launchOnStart-details": `<span>За замовчуванням сценарій користувача автоматично запускається для більшої динаміки, але це також може привести до небажаних наслідків — коли сторінка ламається і відредагувати скрипт неможливо.</span><br><br>
       <span class = "margin-top">
         <b>Примітка:</b><br>
         Альтернативний спосіб відкрити гру не вмикаючи алгоритм — переходити за цією адресою <a href = "https://zoodogood.github.io/piramide/?ignore" class = "lightLink">https://zoodogood.github.io/piramide/?ignore</a><br>
         (Наявне <code>?ignore</code> у кінці посилання.)
       </span>`,

		"settings-action-multiSlab-h2": "Декілька плит рухаються разом",
		"settings-action-multiSlab-details":
			"Мульти-плитки — декілька плиток може переміщуватися паралельно, це суттєво підвищує швидкість, але знижує очевидність відтворюваного та здатно збити з пантелику.<br>Ефективність даної функції найбільш відчутна у складних алгоритмах*<br>",

		"settings-action-activatePoligon-h2": "Порівнювати ефективність алгоритмів",
		"settings-action-activatePoligon-details": `<span>Серйозно зайнялись оптимізацією, бути може Вам цікава статистика?<br>З моменту включення цієї функції буде вестись облік середньої кількості кроків, за які Ваш код може здобути перемогу</span><br>
       <span><br><b>Як це працює?</b><br>
       1. З кожним тріумфом, алгоритм непомітно ще раз виконається у тестовому полігоні зі статичними умовами, котрі були підібрані мною для найбільшого балансу.<br>2. Результат виконання буде записан у браузері для майбутнього порівняння</span>`,

		"settings-action-slabsSpeed-h2": "Швидкість руху",
		"settings-action-slabsSpeed-details":
			"Множник швидкості переміщення плит від вежі до вежі.",
		"settings-action-slabsSpeed-currentValue": "Швидкість:",

		"settings-action-background-h2": "Задній план у грі",
		"settings-action-background-details": `Бажаєте по справжньому гарно? Спробуйте таке — <code class = "no-wrap">linear-gradient(316deg, #ffc857 0%, #32254a 75%)</code><br><a class = "lightLink" href = "https://jemimaabu.github.io/random-gradient-generator/">https://random-gradient</a> — або скористайтесь генератором градієнтів<br><br>З невеликими знаннями про CSS сможете ставити власні зображення і навіть більше!`,

		"settings-action-colorizeFunc-h2": "Функції для фарбування веж",
		"settings-action-colorizeFunc-description":
			"Одне з найскладніших налаштувань 😊<br>Якщо хочете спробувати, прочитайте і не сподівайтесь, що вийде з першої спроби",
		"settings-action-colorizeFunc-advice-#1": `1. За колір плитки відповідає результат функції окраски, яка повертає колір в одному з популярних форматів.<br>Наприклад, формат RGB — <code class = "no-wrap">rgb(255, 0, 0)</code>. Тут вказана насиченість червоного, зеленого і синього — трьох кольорів, комбінуючи які можна отримати будь яку палітру.`,
		"settings-action-colorizeFunc-advice-#2": `2. Найпростішим рішенням буде використовувати функцію для отримання випадкового числа <code class = "no-wrap">random( 5 )</code><br>Вказавши <code class = "no-wrap">rgb(random(255), 0, 0)</code> колір вежі буде випадковим. Але виключно червоного відтінку, бо зелений та синій дорівнюють нулю.`,
		"settings-action-colorizeFunc-advice-#3": `3. Для більш усвідомлених комбінацій знадобиться інформація про номер плитки, за який відповідає доступний аргумент <code>n</code>.<br><code class = "no-wrap">rgb(n * 10, 0, n)</code>  Найнижча плита буде чорною так як n===0, але поступово буде ставати більш червоною та трохи синьою.<br>Максимальна кількість плит доступна у змінній <code>size</code>`,
		"settings-action-colorizeFunc-advice-#4": `4. У редакторі функцій є поле "шанс відобразитися". Назва відповідає сама за себе. Наприклад, якщо хочете щоб відповідне забарвлення застосовувалося частіше, то встановіть число побільше..`,
		"settings-action-colorizeFunc-footer":
			"<i>Якщо функція не повертає колір у одному з форматів або вона завершилася помилкою, забарвлення буде чисто білим.</i>",
		"settings-action-colorizeFunc-content": "Содержимое",
		"settings-action-colorizeFunc-form-function": "Функція:",
		"settings-action-colorizeFunc-form-function-placeholderColor-#1":
			"Чистый червоний '#ff0000'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#2":
			"Чистый синій '#0000ff'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#3":
			"Чистый зелений '#00ff00'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#4":
			"Чистый білий '#ffffff'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#5":
			"Чистый білий rgb(255, 255, 255)",
		"settings-action-colorizeFunc-form-function-placeholderColor-#6":
			"rgb(RED 0-255, GREEN 0-255, BLUE 0-255)",
		"settings-action-colorizeFunc-form-odds": "Шанс відобразитися:",
		"settings-action-colorizeFunc-form-new": "Нова функція",
		"settings-action-colorizeFunc-form-apply": "Зберегти",
		"settings-action-colorizeFunc-form-restore": "Скасувати",

		"settings-action-removeLibrary-h2": "Вимкнути Підказки",
		"settings-action-removeLibrary-details": `Будемо відверті, підказки не потрібні, а ця кнопка тільки заважає! Можете приховати вкладку "Бібліотека" з нижньої панелі.`,

		"settings-action-letItSnow-h2": "Увімкнути сніг",
		"settings-action-letItSnow-details": `Скоро ж новий рік? Хоча.. Це залежить від того, який сьогодні день.`,

		"settings-section-codeEditor": "Редактор коду:",

		"settings-action-codeSyntax-h2": "Стиль синтаксису",
		"settings-action-codeSyntax-details": `Встановлює тему покраски тексту в редакторі коду.<br/>Оберіть один із варіантів забарвлення:`,

		"settings-action-clearedConsole-h2":
			"Чистити консоль при кожному запуску коду",
		"settings-action-clearedConsole-details":
			"У консолі розробника може виявитися дуже велика кількість даних. Щоб виділити важливе, іноді, потрібно прибрати непотрібне.<br>Коли цей параметр увімкнено, консоль буде очищатися при натисканні кнопки Грати.<br>",

		"settings-action-codeSize-h2": "Розмір тексту",
		"settings-action-codeSize-details":
			"Встановлює розмір тексту у редакторі коду.",

		"settings-action-codeareaHeight-h2": "Висота редактору",
		"settings-action-codeareaHeight-details":
			"Ви можете розтягнути редактор во весь екран або, виставив мінімальний розмір, зовсім закрити",

		"settings-section-paramsPage": "Параметри цього меню:",

		"settings-action-menuThemeDark-h2": "Зухвалий дизайн",
		"settings-action-menuThemeDark-details":
			"Перемкніть тему цього меню на чорну з червоними тонами. Для чого це було зроблено?..",

		"settings-action-menuButtonsColor-h2": "Основний колір кнопок",
		"settings-action-menuButtonsColor-details":
			"Перемістіть повзунок, щоб обрати відтінок кольору.",

		"settings-section-other": "Інше:",

		"settings-action-strangeClick-h2": "Ефект вежі при кліку",
		"settings-action-strangeClick-details":
			"Тепер вежі будуть програвати випадкову анімацію коли по ним клікають<br>*Click* *click*",

		"settings-action-disableCustomScroll-h2": "Вимкнути кастомний скролл",
		"settings-action-disableCustomScroll-details":
			"Якщо Ви користувач комп'ютера, то напевно помітили — скролл незвичайний.<br>Перемкніть повзунок тільки в випадку виникнення проблем. В іншому випадку, насолоджуйтесь!",

		"settings-action-alternativeConsole-h2": "Альтернативна консоль",
		"settings-action-alternativeConsole-details":
			"Додає у нижню панель кнопку для запуску спрощеної консолі.<br.Працює для телефонів!",

		"settings-action-lang-h2": "Вибрана Мова",
		"settings-action-lang-en": "Англійська",
		"settings-action-lang-ru": "Російська",
		"settings-action-lang-ua": "Україньска",
		"settings-action-lang-changesAfterRefresh":
			"Зміни набудуть чинності після перезавантаження сторінки",

		"console-clear-message": "Консоль очищена.",
		"console-input-placeholder": "Введіть 2 + 2 . . .",

		// Library
		"library-container-message":
			"Приклади коду не можна скопіювати. T_T<br>Ручне написання позитивно впливає на розуміння того, що Ви робите.",
		"library-container-take": "Добре подумайте, перш ніж щось вибрати",
		"library-container-lacks":
			"*Надрукуйте ще ${ ending(replaces.at(0), 'символ', 'ів', '', 'а') }, щоб відкрити нові підсказки",

		"library-advice-#0-advice": 'const NEW_YEAR = "31.12";',
		"library-advice-#0-title": "Строка",
		"library-advice-#1-advice":
			"// ---------------------- { } ----------------------\nУ цьому меню Ви зможете знайти приклади невеликого коду, які допоможуть розібратися з написанням алгоритму.\nПеретягуйте плитки з підказками, щоб виділити головне.\nСпробуйте перетягти цю пораду у самий низ списку.\n// -------------------------------------------------",
		"library-advice-#1-title": "Вступ",
		"library-advice-#2-advice":
			"// Як варто уявляти поняття вежі і списку:\nlet tower = [7, 12, 3];\nlet list = [tower, tower1, tower2];",
		"library-advice-#2-title": "Масиви",
		"library-advice-#3-advice":
			"// Доступні дані\n// Масив веж\nlet towers = game.state;\nlet secondTower = towers.at(1);\n// Кожна вежа — масив плит\nlet slab = secondTower.at(0);",
		"library-advice-#3-title": "Базова інформація",
		"library-advice-#4-advice":
			"// Щоб переміщати плитки використовуються номери веж і функція `step`\ngame.step(1, 2);\n\n// Для отримання загальної кількості плит або веж:\nlet size  = game.getGameParams().size;\nlet count = game.getGameParams().count;",
		"library-advice-#4-title": "Переміщення",
		"library-advice-#5-advice":
			"// Вивести кожен елемент вежі\nwhile (i < tower.length){\n  console.log( tower.at(i) );\n  i++;\n}",
		"library-advice-#5-title": "Перебір циклом",
		"library-advice-#6-advice":
			'ЦІЛЬ - використовуючи цикл перемістіть всі плитки з першої вежі у другу.\n\nДля вирішення згадайте, які можливості у Вас є:\n1. Переміщення — game.step\n2. Отримання кількості плит у першій вежі — game.state.at(0).length\n3. Цикл, виконуючий дію поки умова "дійсна":\nwhile (x > 0){\n  // Дія\n}\n\nПридумайте як прибрати плитки вежі використовуючи пункти вище.\nОчистка однієї із веж може знадобитися в майбутньому, щоб вирішити головну задачу — зібрати пірамідку.',
		"library-advice-#6-title": "Вирішіть мікрозадачу",
		"library-advice-#7-advice":
			"// ЗНАЙТИ ВЕЖУ З ПЛИТКОЮ РОЗМІРОМ 15;\nfunction findTower(slab){\n  let i = 0;\n  while (i < game.state.length){\n    let tower = game.state.at(i);\n    let isIncludes = tower.includes(slab);\n\n    if (isIncludes)\n      return tower;\n\n    i++;\n  }\n}\n\nlet tower = findTower(15);",
		"library-advice-#7-title": "Башта з плиткою потрібного розміру",
		"library-advice-#8-advice":
			'console.log("Завжди повинна бути конкретна ціль");\n\nlet array = ["У нашому", "випадку..."];\nconsole.log(array);\n\n// Ви використовуєте консоль щоб точно розуміти,\n// що з себе представляють дані\n// Наприклад, виводячи список плит у вежі можна дізнатися,\n// що спочатку масива йдуть плитки знизу, а у кінці — зверху.\n// Це дуже корисна інформація.\n\nНе можу упустити game.console() — Це альтернативний\nпокращений метод, який вирішає проблему класичної версії;\nСинхронізує вивід інформації з зображенням і рухом веж.\n\nconsole.log("Тим не менш користуватися консоллю зовсім не обов\'язково.");',
		"library-advice-#8-title": "Про консоль",
		"library-advice-#9-advice":
			"Спробуйте задаватися такими питаннями як:\n— Чому ця змінна має конкретно цю назву, а не якусь інакшу.\n// Всі назви відображають сутність змінних і їх потрібно перекладати",
		"library-advice-#9-title": "Не марна порада",
		"library-advice-#10-advice":
			"// Поки дійсно — смакуй яблука.\nwhile (true) eatApple();",
		"library-advice-#10-title": "🍎 Яблуко",
		"library-advice-#11-advice":
			"// Чотири пункти класичного рішення\n1. Приберіть всі плитки з першої пірамідки.\n2. Створіть функцію для пошуку вежі з найбільшою плиткою\n3. З цієї вежі приберіть всі непотрібні плитки, а найбільшу відправте до очищеної піраміди.\n4. Повторюйте кроки поки не переможете.",
		"library-advice-#11-title": "Класичне вирішення алгоритму\n(спойлери)",
		"library-advice-#12-advice":
			"Ви досягли кінця бібліотеки 🔥\n/*\n░▄▀▀▀▀▄░░▄▄\n█░░░░░░▀▀░░█░░░░░░▄░▄\n█░║░░░░██░████████████\n█░░░░░░▄▄░░█░░░░░░▀░▀\n░▀▄▄▄▄▀░░▀▀\n*/",
		"library-advice-#12-title": "Досягнення здобуто",
		"library-advice-#13-advice":
			"const game = new Game({size: 30, count: 3}).visualize();\nconst list = game.state;\n\n\n// Звільняємо першу вежу\nwhile (list.at(0).length)\n  game.step(0, 1);\n\n\n// Шукаємо *цю* плитку\nlet found = game.getGameParams().size;\n\nwhile (found > 0){\n  // Вежа з потрібною нам плиткою\n  let tower = list.find( arr => arr.includes(found) );\n  let towerIndex = list.indexOf( tower );\n\n  // Вільна для скидання вежа\n  let shift = list.find( (arr, i) => i !== 0 && arr !== tower );\n  let shiftIndex = list.indexOf( shift );\n\n\n\n  for (let i = tower.length - tower.indexOf(found); i > 1; i--)\n    game.step( towerIndex, shiftIndex );\n\n\n\n  game.step( towerIndex, 0 );\n  found--;\n}",
		"library-advice-#13-title": "Отримайте рішення і розпишіться",

		"crashDefender-crash-title": "Сторінка запинилася?",
		"crashDefender-crash-message":
			'Якщо все добре, ігноруйте це повідомлення і спокійно натискайте "Грати!". Інакше з ймовірністю «99.9%» це був нескінченний цикл.',
	},

	ru: {
		"game-title": "Похоже, здесь пусто.<br><small>Нажмите Играть</small>",

		"main-alert-title-hello": "Привет",
		"main-alert-name": "Игра Пирамидка ⛊",
		"main-alert-description": "Напишите алгоритм, чтобы решить простую задачу",
		"main-alert-detail":
			"*Подробнее <a href = 'javascript:void(0);' onclick = '${ replaces.at(0) }'>внизу</a> страницы",

		"main-onLaunch-console-gameStart": "🦝 Игра запущена",
		"main-onLaunch-console-message":
			"Всё, что Вы помещаете в console.log — будет отображено здесь!",

		"codeSpace-controlButtons-play": "Играть!",
		"codeSpace-controlButtons-scoreMap": "График эффектив.",
		"codeSpace-controlButtons-copy": "Скопировать",
		"codeSpace-controlButtons-showConsole": "Консоль",
		"codeSpace-controlButtons-setDefault": "Код по умолчанию",
		"codeSpace-controlButtons-showHelps": "Библиотека",

		"codeSpace-default-code-comment-game-step":
			"Перемещает верхнюю плитку от первой башенки к третьей башне",

		"footer-article-h1": "Пояснение задачи",
		"footer-article-taskInfo": `Напишите алгоритм, чтобы собрать все плитки внутри одного массива, <i>башни</i>.<br>
       Чтобы их перемещать используйте метод класса: <code>game</code> — <code>step()</code>,<br>
       который принимает два аргумента: номер массива с которого перенести плитку и того, в который её перекинуть.<br>
       Получить массив башен — <code>game.state</code>`,

		"footer-advice-h2": "Прочтите",
		"footer-advice-#1": "Ищите в Интернете то, что Вам интересно.",
		"footer-advice-#2": `Посетите <a title = "Github" href = "https://github.com/zoodogood/piramide" target="_blank"><span class = "icon">g</span> страницу Гитхаба.</a>`,
		"footer-advice-#3":
			"Используйте консоль разработчика (по умолчанию F12) Это поможет получить информацию о процессе выполнения вашего алгоритма.",
		"footer-advice-#4":
			"Помните, Ваш код и статистика сохраняются даже при перезагрузке страницы.",
		"footer-advice-#5":
			"Осторожнее с бесконечными циклами, их условие всегда верно. Зависание страницы — явный признак такого цикла.",
		"footer-advice-settings": "Измените настройки",

		"footer-bottom-hidden": "Самое время нажать *Ctrl + Enter*",

		"alert-title-error": "Просто ошибка",
		"visualizer-tower-tip": "Башня, которую надо собрать",
		"remove-element": "Убрать элемент",

		"settings-panel-save": "Сохранить",
		"settings-panel-restore": "Отменить",

		"settings-sections-details": "Подробности",
		"settings-sections-preview": "Предпросмотр",
		"settings-sections-experimentalFeature": "Экспериментальная функция*",

		"settings-section-main": "Основное:",

		"settings-action-launchOnStart-h2":
			"Запускать алгоритм при загрузке страницы",
		"settings-action-launchOnStart-details": `<span>По умолчанию пользовательский сценарий срабатывает сразу для большей динамики происходящего, но это также может привести к нежелательным последствием — когда страница ломается и отредактировать скрипт никак нельзя.</span><br><br>
       <span class = "margin-top">
         <b>Примечание:</b><br>
         Альтернативный способ открыть игру не запуская алгоритм — производить запуск по этому адресу <a href = "https://zoodogood.github.io/piramide/?ignore" class = "lightLink">https://zoodogood.github.io/piramide/?ignore</a><br>
         (Стоит <code>?ignore</code> в конце ссылки.)
       </span>`,

		"settings-action-multiSlab-h2": "Несколько плит двигаются вместе",
		"settings-action-multiSlab-details":
			"Мульти-плитки — несколько плиток может перемещаться параллельно, что значительно повышает скорость, но снижает очевидность происходящего и способно сбить столку.<br>Эффективность этой функции наиболее ощутима в сложных алгоритмах*<br>",

		"settings-action-activatePoligon-h2": "Сравнивать эффективность алгоритмов",
		"settings-action-activatePoligon-details": `<span>Серьёзно занялись оптимизацией, быть может Вам интересна статистика?<br>С момента включения этой функции будет вестись учёт среднего количества шагов, за которое Ваш код может одержать победу</span><br>
       <span><br><b>Как это работает?</b><br>
       1. С каждым выигрышом, алгоритм незаметно ещё раз выполниться в тестовом полигоне со статичными условиями, которые были подобраны мной для наибольшего баланса.<br>2. Результат выполнения будет записан в браузере для будущего сравнения</span>`,

		"settings-action-slabsSpeed-h2": "Скорость движения",
		"settings-action-slabsSpeed-details":
			"Множитель скорости перемещения плит от башни к башне.",
		"settings-action-slabsSpeed-currentValue": "Текущее значение:",

		"settings-action-background-h2": "Задний фон в игре",
		"settings-action-background-details": `Хотите по настоящему красиво? Попробуйте это — <code class = "no-wrap">linear-gradient(316deg, #ffc857 0%, #32254a 75%)</code><br><a class = "lightLink" href = "https://jemimaabu.github.io/random-gradient-generator/">https://random-gradient</a> — или воспользуйтесь генератором градиентов<br><br>С небольшими знаниями о CSS, сможете ставить свои изображения и даже больше!`,

		"settings-action-colorizeFunc-h2": "Окраска плит",
		"settings-action-colorizeFunc-description":
			"Одна из самых сложных настроек 😊<br>Если хотите попробовать, пожалуйста, прочтите и не надейтесь, что получится с первого раза",
		"settings-action-colorizeFunc-advice-#1": `1. За цвет плитки отвечает результат функции окраски, которая возвращает цвет в одном из популярных форматов.<br>Например, формат RGB — <code class = "no-wrap">rgb(255, 0, 0)</code>. Здесь указана насыщенность красного, зеленого и синего — трёх цветов, комбинируя которые можно получить любую палитру.`,
		"settings-action-colorizeFunc-advice-#2": `2. Самым простым решением будет использовать функцию для получения случайного числа <code class = "no-wrap">random( 5 )</code><br>Введя <code class = "no-wrap">rgb(random(255), 0, 0)</code> цвет пирамиды будет случайным. Но исключительно красного оттенка, ведь зелёный и синий равны нулю.`,
		"settings-action-colorizeFunc-advice-#3": `3. Для более осознанных комбинаций пригодится информация о номере плитки, за который отвечает доступный аргумент <code>n</code>.<br><code class = "no-wrap">rgb(n * 10, 0, n)</code> Самая нижняя плита будет чёрной т.к <code>n===0</code>, но постепенно будет становится более красной и немного синей.<br>Максимальное число плит доступно в переменной <code>size</code>`,
		"settings-action-colorizeFunc-advice-#4": `4. В редакторе функций есть поле "шанс отобразится". Название отвечает само за себя. Например, если хотите чтобы соответвующий окрас применялся чаще других, то установите число побольше..`,
		"settings-action-colorizeFunc-footer":
			"<i>Если функция не возвращает цвет в одном из форматов или она завершилась ошибкой, окрас будет чисто белым.</i>",
		"settings-action-colorizeFunc-content": "Содержимое",
		"settings-action-colorizeFunc-form-function": "Функция:",
		"settings-action-colorizeFunc-form-function-placeholderColor-#1":
			"Чистый красный '#ff0000'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#2":
			"Чистый синий '#0000ff'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#3":
			"Чистый зелёный '#00ff00'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#4":
			"Чистый белый '#ffffff'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#5":
			"Чистый белый rgb(255, 255, 255)",
		"settings-action-colorizeFunc-form-function-placeholderColor-#6":
			"rgb(RED 0-255, GREEN 0-255, BLUE 0-255)",
		"settings-action-colorizeFunc-form-odds": "Шанс отобразится:",
		"settings-action-colorizeFunc-form-new": "Добавить",
		"settings-action-colorizeFunc-form-apply": "Применить",
		"settings-action-colorizeFunc-form-restore": "Отменить",

		"settings-action-removeLibrary-h2": "Отключить Подсказки",
		"settings-action-removeLibrary-details": `Будем честны, подсказки не нужны, а эта кнопка только мешает! Можете скрыть вкладку "Библиотека" из нижней панели.`,

		"settings-action-letItSnow-h2": "Включить снег",
		"settings-action-letItSnow-details": `Скоро ведь новый год? Хотя.. Это зависит от того, какой сегодня день.`,

		"settings-section-codeEditor": "Редактор кода:",

		"settings-action-codeSyntax-h2": "Стиль шрифта",
		"settings-action-codeSyntax-details": `Устанавливает цветовую тему в редакторе кода.<br/>Выберите один из вариантов окраски синтаксиса:`,

		"settings-action-clearedConsole-h2":
			"Очищать консоль при каждом запуске кода",
		"settings-action-clearedConsole-details":
			"В консоли разработчика может оказываться очень большое количество данных.. Чтобы выделить важное, иногда, нужно убрать ненужное.<br>Когда этот параметр включён, консоль будет чистится при нажатии кнопки Играть.<br>",

		"settings-action-codeSize-h2": "Размер шрифта",
		"settings-action-codeSize-details":
			"Устанавливает размер шрифта в редакторе кода.",

		"settings-action-codeareaHeight-h2": "Высота редактора",
		"settings-action-codeareaHeight-details":
			"Вы можете растянуть редактор во весь экран или, установив минимальный размер, закрыть его",

		"settings-section-paramsPage": "Настройки этого меню:",

		"settings-action-menuThemeDark-h2": "Дерзкий дизайн",
		"settings-action-menuThemeDark-details":
			"Переключите тему этого меню на чёрную с красными тонами. Для чего это было сделано?..",

		"settings-action-menuButtonsColor-h2": "Основной цвет кнопок",
		"settings-action-menuButtonsColor-details":
			"Переместите ползунок, чтобы выбрать оттенок цвета.",

		"settings-section-other": "Другое:",

		"settings-action-strangeClick-h2": "Эффект башни при клике",
		"settings-action-strangeClick-details":
			"Теперь пирамидки будут проигрывать случайную анимацию когда по ним кликают<br>*Click* *click*",

		"settings-action-disableCustomScroll-h2": "Отключить кастомный скролл",
		"settings-action-disableCustomScroll-details":
			"Если Вы пользователь компьютера, то навярняка заметили — скроллинг необычный.<br>Переключите ползунок только случае возникновения проблем. В ином случае, наслаждайтесь!",

		"settings-action-alternativeConsole-h2": "Альтернативная консоль",
		"settings-action-alternativeConsole-details":
			"Добавляет в нижнюю панель кнопку для включения упрощенной консоли.<br>Работает для телефонов!",

		"settings-action-lang-h2": "Выбранный Язык",
		"settings-action-lang-en": "Английский",
		"settings-action-lang-ru": "Русский",
		"settings-action-lang-ua": "Украинский",
		"settings-action-lang-changesAfterRefresh":
			"Изменения вступят в силу после перезагрузки страницы",

		"console-clear-message": "Консоль очищена.",
		"console-input-placeholder": "Введите 2 + 2 . . .",

		// Library
		"library-container-message":
			"Примеры кода нельзя скопировать. T_T<br>Ручное написание положительно влияет на понимание того, что Вы делаете.",
		"library-container-take": "Хорошо подумайте перед тем, как что-то выбрать",
		"library-container-lacks":
			"*Напишите ещё ${ ending(replaces.at(0), 'символ', 'ов', '', 'а') }, чтобы открыть новые подсказки",

		"library-advice-#0-advice": 'const NEW_YEAR = "31.12";',
		"library-advice-#0-title": "Строка",
		"library-advice-#1-advice":
			"// ---------------------- { } ----------------------\nВ этом меню Вы сможете найти примеры небольшого кода,\nкоторые помогут разобраться с написанием алгоритма.\nПеретаскивайте плитки с подсказками, чтобы выделить главное.\nПопробуйте переместить этот совет в самый низ списка\n// -------------------------------------------------",
		"library-advice-#1-title": "Введение",
		"library-advice-#2-advice":
			"// Как стоит представлять понятия башни и списка:\nlet tower = [7, 12, 3];\nlet list = [tower, tower1, tower2];",
		"library-advice-#2-title": "Массивы",
		"library-advice-#3-advice":
			"// Доступные данные\n\n// Массив башен\nlet towers = game.state;\nlet secondTower = towers.at(1);\n// Каждая башня — массив плит\nlet slab = secondTower.at(0);",
		"library-advice-#3-title": "Базовая информация",
		"library-advice-#4-advice":
			"// Чтобы перемещать плитки используются номера башен и функция `step`\ngame.step(1, 2);\n\n// Для получения общего количества плит или башен:\nlet size  = game.getGameParams().size;\nlet count = game.getGameParams().count;",
		"library-advice-#4-title": "Перемещение",
		"library-advice-#5-advice":
			"// Вывести каждый элемент башни\nwhile (i < tower.length){\n  console.log( tower.at(i) );\n  i++;\n}",
		"library-advice-#5-title": "Перебор циклом",
		"library-advice-#6-advice":
			'ЦЕЛЬ — Используя цикл переместите все плитки из первой башни во вторую.\n\nДля решения вспомните, какие возможности у Вас есть:\n1. Перемещение — game.step\n2. Получение количества плит в первой башне — game.state.at(0).length\n3. Цикл, выполняющий действие пока условие "правдиво":\nwhile (x > 0){\n  // Действие\n}\n\nПридумайте как убрать содержимое башни используя пункты выше.\nОчистка одной из башен может пригодится в будущем,\nчтобы решить основную задачу — собрать пирамидку',
		"library-advice-#6-title": "Решите микрозадачу",
		"library-advice-#7-advice":
			"// НАЙТИ БАШНЮ С ПЛИТКОЙ РАЗМЕРОМ 15;\nfunction findTower(slab){\n  let i = 0;\n  while (i < game.state.length){\n    let tower = game.state.at(i);\n    let isIncludes = tower.includes(slab);\n\n    if (isIncludes)\n      return tower;\n\n    i++;\n  }\n}\n\nlet tower = findTower(15);",
		"library-advice-#7-title": "Башня с плиткой нужного размера",
		"library-advice-#8-advice":
			'console.log("Всегда должна быть конечная цель");\n\nlet array = ["В нашем", "случае..."];\nconsole.log(array);\n\n// Вы используете консоль чтобы точно понимать,\n// что из себя представляют данные\n// Например, выводя список плит в башне можно узнать,\n// что в начале массива идут плитки снизу, а в конце — сверху.\n// Это весьма полезная информация.\n\nНе могу упустить game.console() — Это альтернативный\nулучшенный метод, который решает проблему классической версии;\nСинхронизирует вывод информации с картинкой и движением башен.\n\nconsole.log("Тем не менее пользоваться консолью совсем необязательно.");',
		"library-advice-#8-title": "О выводе в консоль",
		"library-advice-#9-advice":
			"Попробуйте задаваться такими вопросами как:\n— Почему эта переменная называется именно так, а не как-то иначе.\n// Все названия отображают суть переменных и их нужно переводить",
		"library-advice-#9-title": "Не бесполезный совет",
		"library-advice-#10-advice":
			"// Пока истина — кушай яблоки.\nwhile (true) eatApple();",
		"library-advice-#10-title": "🍎 Яблоко",
		"library-advice-#11-advice":
			"// Четыре пункта к классическому решению\n1. Уберите все плитки с первой пирамидки.\n2. Создайте функцию для поиска башни с самой большой плиткой\n3. С этой башни уберите все не нужные плитки, а самую большую отправьте к очищенной пирамиде.\n4. Повторяйте шаги пока не выиграете.",
		"library-advice-#11-title": "Классическое решение алгоритма\n(спольеры)",
		"library-advice-#12-advice":
			"Вы достигли конца библиотеки 🔥\n/*\n░▄▀▀▀▀▄░░▄▄\n█░░░░░░▀▀░░█░░░░░░▄░▄\n█░║░░░░██░████████████\n█░░░░░░▄▄░░█░░░░░░▀░▀\n░▀▄▄▄▄▀░░▀▀\n*/",
		"library-advice-#12-title": "Откройте достижение",
		"library-advice-#13-advice":
			"const game = new Game({size: 30, count: 3}).visualize();\nconst list = game.state;\n\n\n// Освобождаем первую башню\nwhile (list.at(0).length)\n  game.step(0, 1);\n\n\n// Ищем *эту* плитку\nlet found = game.getGameParams().size;\n\nwhile (found > 0){\n  // Башня с нужной нам плиткой\n  let tower = list.find( arr => arr.includes(found) );\n  let towerIndex = list.indexOf( tower );\n\n  // Свободная для сброса башня\n  let shift = list.find( (arr, i) => i !== 0 && arr !== tower );\n  let shiftIndex = list.indexOf( shift );\n\n\n\n  for (let i = tower.length - tower.indexOf(found); i > 1; i--)\n    game.step( towerIndex, shiftIndex );\n\n\n\n  game.step( towerIndex, 0 );\n  found--;\n}",
		"library-advice-#13-title": "Получите решение и распишитесь",

		"crashDefender-crash-title": "Страница остановилась?",
		"crashDefender-crash-message":
			'Если всё в порядке, проигнорируйте это сообщение и спокойно нажмите кнопку "Играть!". Иначе с вероятностью «99,9%» это был бесконечный цикл.',
	},

	en: {
		"game-title": "Looks like here empty<br><small>Click Play!</small>",

		"main-alert-title-hello": "Hello",
		"main-alert-name": "Game Piramide ⛊",
		"main-alert-description": "Write an algorithm to solve a simple problem",
		"main-alert-detail":
			"*More detail at the <a href = 'javascript:void(0);' onclick = '${ replaces.at(0) }'>bottom</a> of page",

		"main-onLaunch-console-gameStart": "🦝 Game started",
		"main-onLaunch-console-message": `Anything you put in "console.log" will be displayed here!`,

		"codeSpace-controlButtons-play": "Play",
		"codeSpace-controlButtons-scoreMap": "Show graph",
		"codeSpace-controlButtons-copy": "Copy",
		"codeSpace-controlButtons-showConsole": "Console",
		"codeSpace-controlButtons-setDefault": "Reset code",
		"codeSpace-controlButtons-showHelps": "Library",

		"codeSpace-default-code-comment-game-step":
			"Moves the top tile from the first tower to the third tower",

		"footer-article-h1": "Task info",
		"footer-article-taskInfo": `Write an algorithm to collect all the tiles inside a single array, <i>tower</i>.<br>
       To move them, use the class method: <code>game</code> — <code>step()</code>,<br>
       which takes two arguments: the number of the array from which to move the tile and the array to which to move it to.<br>
       Get array of towers — <code>game.state</code>`,

		"footer-advice-h2": "You! Read me! NOW!",
		"footer-advice-#1": "Search the Internet for what you are interested in.",
		"footer-advice-#2": `Visit the <a title = "Github" href = "https://github.com/zoodogood/piramide" target="_blank"><span class = "icon">g</span> Github page.</a>`,
		"footer-advice-#3":
			"Use the developer console (default is F12) This will help to get information about the process of executing your algorithm.",
		"footer-advice-#4":
			"Remember, your code and stats are saved even if you reload the page.",
		"footer-advice-#5":
			"Be careful with infinite loops, their condition is always true. A page freeze is a clear sign of such a loop.",
		"footer-advice-settings": "Change Settings",

		"footer-bottom-hidden": "Can you press *Ctrl + Enter* ?",

		"alert-title-error": "Simple error",
		"visualizer-tower-tip": "A tower to be built",
		"remove-element": "Remove-element",

		"settings-panel-save": "Save",
		"settings-panel-restore": "Restore",

		"settings-sections-details": "Details",
		"settings-sections-preview": "preview",
		"settings-sections-experimentalFeature": "Experimental feature*",

		"settings-section-main": "Main:",

		"settings-action-launchOnStart-h2": "Runs you code on page loaded",
		"settings-action-launchOnStart-details": `<span>By default, custom code is triggered to make things more dynamic, but this can also lead to unintended consequences — when the page crashes and there is no way to edit the script.</span><br><br>
       <span class = "margin-top">
         <b>Note:</b><br>
         An alternative way to open the game without running the algorithm is to launch at this address <a href = "https://zoodogood.github.io/piramide/?ignore" class = "lightLink">https://zoodogood.github.io/piramide/?ignore</a><br>
         (There is a <code>?ignore</code> at the end of the link.)
       </span>`,

		"settings-action-multiSlab-h2": "Multiple plates moving together",
		"settings-action-multiSlab-details":
			"Multi-tiles - several tiles can be moved in parallel, which significantly increases speed, but reduces the obviousness of what is happening and can be confusing.<br>The effectiveness of this feature is most noticeable in complex algorithms*<br>.",

		"settings-action-activatePoligon-h2":
			"Compare the efficiency of algorithms",
		"settings-action-activatePoligon-details": `<span>Serious about optimization, maybe you are interested in statistics?<br>Since this feature has been enabled, the average number of steps your code can win in will be kept track of</span><br>
       <span><br><b>How it works?</b><br>
       1. With each win, the algorithm will stealthily run one more time in a test polygon with static conditions that I have chosen for the greatest balance.<br>2. The result of the execution will be recorded in the browser for future comparison</span>`,

		"settings-action-slabsSpeed-h2": "Movement speed",
		"settings-action-slabsSpeed-details":
			"The speed multiplier for moving slabs from tower to tower.",
		"settings-action-slabsSpeed-currentValue": "Current value:",

		"settings-action-background-h2": "Background",
		"settings-action-background-details": `(NEED TRANSLATE #ff0000)Хотите по настоящему красиво? Попробуйте это — <code class = "no-wrap">linear-gradient(316deg, #ffc857 0%, #32254a 75%)</code><br><a class = "lightLink" href = "https://jemimaabu.github.io/random-gradient-generator/">https://random-gradient</a> — или воспользуйтесь генератором случайных цветов<br><br>При небольших знаниях о CSS сможете ставить свои изображения или гифки`,

		"settings-action-colorizeFunc-h2": "Slabs colorizze",
		"settings-action-colorizeFunc-description":
			"(NEED TRANSLATE #ff0000)Одна из самых сложных настроек 😊<br>Если хотите попробовать, пожалуйста, прочтите и не надейтесь, что получится с первого раза",
		"settings-action-colorizeFunc-advice-#1": `1. За цвет плитки отвечает результат функции окраски, которая возвращает цвет в одном из популярных форматов.<br>Например, формат RGB — <code class = "no-wrap">rgb(255, 0, 0)</code>. Здесь указана насыщенность красного, зеленого и синего — трёх цветов, комбинируя которые можно получить любую палитру.`,
		"settings-action-colorizeFunc-advice-#2": `2. Самым простым решением будет использовать функцию для получения случайного числа <code class = "no-wrap">random( 5 )</code><br>Введя <code class = "no-wrap">rgb(random(255), 0, 0)</code> цвет пирамиды будет случайным. Но исключительно красного оттенка, ведь зелёный и синий равны нулю.`,
		"settings-action-colorizeFunc-advice-#3": `3. Для более осознанных комбинаций пригодится информация о номере плитки, за который отвечает доступный аргумент <code>n</code>.<br><code class = "no-wrap">rgb(n * 10, 0, n)</code> Самая нижняя плита будет чёрной т.к <code>n===0</code>, но постепенно будет становится более красной и немного синей.<br>Максимальное число плит доступно в переменной <code>size</code>`,
		"settings-action-colorizeFunc-advice-#4": `4. В редакторе функций есть поле "шанс отобразится". Название отвечает само за себя. Например, если хотите чтобы соответвующий окрас применялся чаще других, то установите число побольше..`,
		"settings-action-colorizeFunc-footer":
			"<i>Если функция не возвращает цвет в одном из существующих форматов или она завершилась ошибкой, окрас будет чисто белым.</i>",
		"settings-action-colorizeFunc-content": "content",
		"settings-action-colorizeFunc-form-function": "Function:",
		"settings-action-colorizeFunc-form-function-placeholderColor-#1":
			"Pure red '#ff0000'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#2":
			"Pure blue '#0000ff'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#3":
			"Pure green '#00ff00'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#4":
			"Pure white '#ffffff'",
		"settings-action-colorizeFunc-form-function-placeholderColor-#5":
			"Pure white rgb(255, 255, 255)",
		"settings-action-colorizeFunc-form-function-placeholderColor-#6":
			"rgb(RED 0-255, GREEN 0-255, BLUE 0-255)",
		"settings-action-colorizeFunc-form-odds": "Odds to show:",
		"settings-action-colorizeFunc-form-new": "Create",
		"settings-action-colorizeFunc-form-apply": "Save",
		"settings-action-colorizeFunc-form-restore": "Restore",

		"settings-action-removeLibrary-h2": "Remove Library",
		"settings-action-removeLibrary-details": `Let's be honest, no tips are needed, and this button only interferes! You can hide the "Library" tab from the bottom panel.`,

		"settings-action-letItSnow-h2": "Let it snow",
		"settings-action-letItSnow-details": `New Year's Eve is coming up, right? Well, that depends on what day it is.`,

		"settings-section-codeEditor": "Code editor:",

		"settings-action-codeSyntax-h2": "Code syntax",
		"settings-action-codeSyntax-details": `Sets the color theme in the code editor.<br/>Choose one of the syntax coloring options:`,

		"settings-action-clearedConsole-h2":
			"Clear the console each time the code is run",
		"settings-action-clearedConsole-details":
			"There can be a lot of data in the developer's console... To highlight important data, sometimes it is necessary to remove unnecessary data.<br>When this option is enabled, the console will be cleaned when the Play button is pressed.<br>",

		"settings-action-codeSize-h2": "Font size",
		"settings-action-codeSize-details":
			"Sets the font size in the code editor.",

		"settings-action-codeareaHeight-h2": "Editor heigth",
		"settings-action-codeareaHeight-details":
			"You can stretch the editor to fill the screen or, by setting a minimum size, close it",

		"settings-section-paramsPage": "Setup page settings",

		"settings-action-menuThemeDark-h2": "Dark design",
		"settings-action-menuThemeDark-details":
			"Switch the theme of this menu to black with red tones. What was it done for..?",

		"settings-action-menuButtonsColor-h2": "Accent color",
		"settings-action-menuButtonsColor-details":
			"Move the slider to select the color hue.",

		"settings-section-other": "Other:",

		"settings-action-strangeClick-h2": "Tower effect on click",
		"settings-action-strangeClick-details":
			"Towers will play a random animation when they are clicked<br>*Click* *click*",

		"settings-action-disableCustomScroll-h2": "Disable custom scroll",
		"settings-action-disableCustomScroll-details":
			"If you are a computer user, you will surely notice that the scrolling is unusual. <br>Switch the slider only in case of problems. Otherwise, enjoy!",

		"settings-action-alternativeConsole-h2": "Alternative console",
		"settings-action-alternativeConsole-details":
			"Adds a button to the bottom panel to enable a simplified console.<br>Works for phones!",

		"settings-action-lang-h2": "Selected Language",
		"settings-action-lang-en": "English",
		"settings-action-lang-ru": "Russian",
		"settings-action-lang-ua": "Ukrainian",
		"settings-action-lang-changesAfterRefresh":
			"The changes will take effect after the page is reloaded",

		"console-clear-message": "Console clear.",
		"console-input-placeholder": "Enter 2 + 2 . . .",

		// Library
		"library-container-message":
			"Примеры кода нельзя скопировать. T_T<br>Ручное написание положительно влияет на понимание того, что Вы делаете.(NEED TRANSLATE #ff0000)",
		"library-container-take": "Think carefully before choosing something",
		"library-container-lacks":
			"*Напишите ещё ${ ending(replaces.at(0), 'символ', 'ов', '', 'а') }, чтобы открыть новые подсказки (NEED TRANSLATE #ff0000)",

		"library-advice-#0-advice": 'const NEW_YEAR = "31.12";',
		"library-advice-#0-title": "String",
		"library-advice-#1-advice":
			"(NEED TRANSLATE #ff0001)\n// ---------------------- { } ----------------------\nВ этом меню Вы сможете найти примеры небольшого кода,\nкоторые помогут разобраться с написанием алгоритма.\nПеретаскивайте плитки с подсказками, чтобы выделить главное.\nПопробуйте переместить этот совет в самый низ списка\n// -------------------------------------------------",
		"library-advice-#1-title": "Введение",
		"library-advice-#2-advice":
			"// Как стоит представлять понятия башни и списка:\nlet tower = [7, 12, 3];\nlet list = [tower, tower1, tower2];",
		"library-advice-#2-title": "Arrays",
		"library-advice-#3-advice":
			"// Доступные данные\n\n// Массив башен\nlet towers = game.state;\nlet secondTower = towers.at(1);\n// Каждая башня — массив плит\nlet slab = secondTower.at(0);",
		"library-advice-#3-title": "Базовая информация",
		"library-advice-#4-advice":
			"// Чтобы перемещать плитки используются номера башен и функция `step`\ngame.step(1, 2);\n\n// Для получения общего количества плит или башен:\nlet size  = game.getGameParams().size;\nlet count = game.getGameParams().count;",
		"library-advice-#4-title": "Towers moving",
		"library-advice-#5-advice":
			"// Вывести каждый элемент башни\nwhile (i < tower.length){\n  console.log( tower.at(i) );\n  i++;\n}",
		"library-advice-#5-title": "Loop for every slab",
		"library-advice-#6-advice":
			'ЦЕЛЬ — Используя цикл переместите все плитки из первой башни во вторую.\n\nДля решения впомните какие возможности у Вас есть:\n1. Перемещение — game.step\n2. Получение количества плит в первой башне — game.state.at(0).length\n3. Цикл, выполняющий действие пока условие "правдиво":\nwhile (x > 0){\n  // Действие\n}\n\nПридумайте как убрать содержимое башни используя пункты выше.\nОчистка одной из башен может пригодится в будущем,\nчтобы решить основную задачу — собрать пирамидку',
		"library-advice-#6-title": "Решите микрозадачу",
		"library-advice-#7-advice":
			"// НАЙТИ БАШНЮ С ПЛИТКОЙ РАЗМЕРОМ 15;\nfunction findTower(slab){\n  let i = 0;\n  while (i < game.state.length){\n    let tower = game.state.at(i);\n    let isIncludes = tower.includes(slab);\n\n    if (isIncludes)\n      return tower;\n\n    i++;\n  }\n}\n\nlet tower = findTower(15);",
		"library-advice-#7-title": "Башня с плиткой нужного размера",
		"library-advice-#8-advice":
			'console.log("Всегда должна быть конечная цель");\n\nlet array = ["В нашем", "случае..."];\nconsole.log(array);\n\n// Вы используете консоль чтобы точно понимать\n// что из себя представляют данные\n// Например, выводя список плит в башне можно узнать,\n// что в начале массива идут плитки снизу, а в конце — сверху.\n// Это весьма полезная информация.\n\nНе могу упустить game.console() — Это альтернативный\nулучшенный метод, который решает проблему классической версии;\nСинхронизирует вывод информации с картинкой и движением башен.\n\nconsole.log("Тем не менее пользоваться консолью совсем необязательно.");',
		"library-advice-#8-title": "О выводе в консоль",
		"library-advice-#9-advice":
			"Попробуйте задаваться такими вопросами как:\n— Почему эта переменная называется именно так, а не как-то иначе.\n// Все названия отображают суть переменных и их нужно переводить",
		"library-advice-#9-title": "Не бесполезный совет",
		"library-advice-#10-advice":
			'// "Пока истина — кушай яблоки."\nwhile (true) eatApple();',
		"library-advice-#10-title": "🍎 Apple",
		"library-advice-#11-advice":
			"// Четыре пункта к классическому решению\n1. Уберите все плитки с первой пирамидки.\n2. Создайте функцию для поиска башни с самой большой плиткой\n3. С этой башни уберите все не нужные плитки, а самую большую отправьте к очищенной пирамиде.\n4. Повторяйте шаги пока не выиграете.",
		"library-advice-#11-title": "Классическое решение алгоритма\n(спольеры)",
		"library-advice-#12-advice":
			"Вы достигли конца библиотеки 🔥\n/*\n░▄▀▀▀▀▄░░▄▄\n█░░░░░░▀▀░░█░░░░░░▄░▄\n█░║░░░░██░████████████\n█░░░░░░▄▄░░█░░░░░░▀░▀\n░▀▄▄▄▄▀░░▀▀\n*/",
		"library-advice-#12-title": "Откройте достижение",
		"library-advice-#13-advice":
			"const game = new Game({size: 30, count: 3}).visualize();\nconst list = game.state;\n\n\n// Освобождаем первую башню\nwhile (list.at(0).length)\n  game.step(0, 1);\n\n\n// Ищем *эту* плитку\nlet found = game.getGameParams().size;\n\nwhile (found > 0){\n  // Башня с нужной нам плиткой\n  let tower = list.find( arr => arr.includes(found) );\n  let towerIndex = list.indexOf( tower );\n\n  // Свободная для сброса башня\n  let shift = list.find( (arr, i) => i !== 0 && arr !== tower );\n  let shiftIndex = list.indexOf( shift );\n\n\n\n  for (let i = tower.length - tower.indexOf(found); i > 1; i--)\n    game.step( towerIndex, shiftIndex );\n\n\n\n  game.step( towerIndex, 0 );\n  found--;\n}",
		"library-advice-#13-title": "Получите решение и распишитесь",

		"crashDefender-crash-title": "Did the page stop?",
		"crashDefender-crash-message":
			'If everything was fine, ignore this message and calmly click "Play!" If not, there is a «99.9%» chance that it was an infinite loop.',
	},
};
