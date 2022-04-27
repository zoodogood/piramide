# «Пирамидка» — игра.
### [**Запустить в новой вкладке.**](https://zoodogood.github.io/piramide/)  
  

Пользователю предстоит написать алгоритм для решения детской задачи — построить пирамидку, которая с высотой постепенно уменьшается в диаметре.  
![Мем](https://media.discordapp.net/attachments/770349221634244639/897401681778733096/unknown.png)
  
***
  
Неважно, вы человек не знакомый с программированием или, наоборот, собаку съели.. всё-равно. Посидеть часок и разобраться будет интересно каждому. Попробуйте.  
  
**Как начать играть:**  
1. Перейдите по ссылке выше, чтобы запустить проект.
2. Вы увидите область с кодом и чуть ниже несколько кнопок..
3. Одна из них — кнопка "Играть!"  
Её нажатие сгенерирует случайный набор _Башен_ и запустит написанный вами алгоритм.
4. Если пролистать страницу вниз, вы увидите небольшое разъяснение для самых маленьких.

![gameScreen](https://cdn.discordapp.com/attachments/864098765546717184/902089555807731782/unknown.png)

Код написан на языке JavaScript, и, если вы не знакомы с ним, прочитайте [минимально-необходимые знания 🔥](https://github.com/zoodogood/piramide/blob/main/resources/learnjs.md)  
Извините, Python, C++ и другие не поддерживаются ʕ·ᴥ·ʔ
  
  
## **_#HARDMODE_**
Хардмод — сложный режим для тех, кому стало недостаточно стандартного.  
Он добавляет всего одно правило — нельзя ставить большую _плитку_ на более маленькую. Это небольшое изменение меняет суть задачи полностью!  
Чтобы включить его, укажите свойство `hardmode: true`, как показано ниже: 
```js
new Game({ hardmode: true, size: 15, count: 3 });
```
ᅠ  
## Другое
Чтобы лучше понять как устроена игра, взгляните на [её код](https://github.com/zoodogood/piramide/blob/main/classes/Game.js).  
Вопреки наличию страшных символов он очень прост и имеет множество пояснений.  
  
**«Ханойская башня»** — старинная головоломка, которая стала рождением мема, который в свою очередь породил мою игру..  
Эта башня, кстати, была придумана в 1883 и без преувеличения крайне простая :)  

Отличия между работой Люка, Франсуа Эдуарда Анатолия (математика, создателя головоломки) от моей поделки довольно существенные:  
Там количество пирамид — всегда три, а все плитки изначально находятся в одном положении. Здесь-же, в _‹Пирамидке›_, башен может быть больше семидесяти и положение элементов случайно. Правило «Меньшей плитки на большую» и вовсе может игнорироваться, чтобы упростить решение задачи.  
***
  
  
**Конец.**  
Делитесь интересными способами прохождения, ибо их достаточно много. Желаю удачи!  
> [**Открыть игру**](https://zoodogood.github.io/piramide/)

![gameScreeWinner](https://cdn.discordapp.com/attachments/565126051496198164/902442790624059432/unknown.png)
