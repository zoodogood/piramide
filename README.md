# Игра "Пирамидка"
## [Начнём](https://zoodogood.github.io/piramide/)  
  

Пользователю предстоит написать алгоритм для решения детской задачи — построить пирамидку, которая с высотой постепенно уменьшается в диаметре.  
![Мем](https://media.discordapp.net/attachments/770349221634244639/897401681778733096/unknown.png)
  

***

## Минимальные-необходимые знания о JS
+ [Хранение, чтение данных](https://github.com/zoodogood/piramide/blob/main/README.md#%D1%85%D1%80%D0%B0%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5-%D1%87%D1%82%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85)
+ [Строки](https://github.com/zoodogood/piramide/blob/main/README.md#%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B8)
+ [Условия, циклы](https://github.com/zoodogood/piramide/blob/main/README.md#%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F-%D1%86%D0%B8%D0%BA%D0%BB%D1%8B)
+ [Функции](https://github.com/zoodogood/piramide/blob/main/README.md#%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8)
+ [Объекты](https://github.com/zoodogood/piramide/blob/main/README.md#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B)
+ [Небольшая задача](https://github.com/zoodogood/piramide/blob/main/README.md#%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B0)
+ [Итоги](https://github.com/zoodogood/piramide/blob/main/README.md#%D0%B8%D1%82%D0%BE%D0%B3%D0%B8)
  
### Хранение, чтение данных:  
```js
// Вводное слово let; x — имя ячейки данных; "=" — «присвоить»
// Слово let используется только один раз — при создании новой ячейки данных, верно говоря, переменной
let x = 5;
x = 7;

// В этом примере я хочу показать, что для получения данных из переменной достаточно указать её название
let y = x;
// В консоль будет выведено число 7. Если вы не поняли почему так произошло, обратите внимание на последовательность действий
console.log( y ); // 7

```
  
### Строки:
```js
let string = "Хранят текстовые данные";
let str = 'Содержимое внутри кавычек — содержимое строки';

```
  
  
### Условия, циклы:
```js
if (x > y){
  // выполниться, если x больше y
}

while (x > y){
  y = y + 1;
  // будет выполнять до тех пор, пока условие верно
}
```

  

### Функции:  
Функции — это переменные, которые хранят в себе код.  
Они могут иметь аргументы — принимать передаваемые для них данные.
```js
console.log("log — это функция");
```
Кроме выполнения кода функции возвращают некоторое значение.  
Ниже приведен пример того, как создать функцию и как она использует аргументы.  
```js
function sum(a, b){
  return a + b;
}
// return указывает на значение, которое даёт нам функция

sum( 2 + 8 ); // 10
```
  
  

Другой пример:
```js
function repeatString(str, count){
 let i = 0;
 let myString = "";

 while (i < count){
   myString += str;
   i++;
 }
 return myString;
}

let string = repeatString( "🍪", 3 ); // "🍪🍪🍪"
console.log( "🦝" + string ); // "🦝🍪🍪🍪"
```
Мы создали пустую строку и с помощью цикла несколько раз наполнили её символом печенья. После сохранили в переменную и вывели значение в консоль.

### Объекты:
Назовите мне любой предмет. Допустим вы назвали красный кубик.
Как и любой объект наш куб имеет свойства. Он красный, у него есть размер, кубик состоит из какого-то материала... — все это свойства объекта.
```js
let cube = {
  color: "red",
  size: "10cm",
  material: "wood"
}
console.log( cube.color ); // red
```
К слову, `console` тоже объект ツ

Объекты не всегда содержат данные об абстрактных вещах, например, мы можем создать коллекцию независимых предметов, и это все ещё будет объект!
```js
let cube = {color: "green"};
let image = {width: 5, height: 7};

let collection = {
  cube: cube,
  picture: image,
  carrot: "🥕"
}
collection.cube.color = "blue" // "blue"  
cube.color // "blue" (прошлая строчка кода изменила значение переменной-свойства color)
// Так тоже будет работать:
collection["carrot"]; // "🥕"
```

#### Массив
Массив — подвид объекта, и представляет обычный список, набор данных
```js
let array = [
  7,
  3,
  5,
  8,
  1
]
array[0] // 7
// Напрямую к данным массива можно обращаться только по их номеру, кроме того нумерация начинается с нуля.
// arr[0] — первый элемент массива
// array.0, будет ошибка, поэтому мы используем такую сложную конструкцию
```

## Задача
Если вы прочитали до сюда, спасибо вам :)  
Хотя целью данного материала и не является научить Вас программировать, для усвоения прочитанного необходимо подумать. Задаче быть!  
Сделайте небошьшой перерыв, выпейте чаю и через 5–10 минут возвращайтесь. Это обязательно.
  
  
***
  
  
#### Условия задачи
Вы уже знаете, что такое массив и как получить его элемент.
Напишите функцию, которая с помощью цикла по одному выведет в консоль все элементы.  
Массив создайте сами.  
  
Здесь вы можете выполнять код и сразу видеть результат:  
https://jsconsole.com/  
_Начните с тренеровки на самых простых вещах_

## Итоги
***
1. Программирование старается быть как можно более очевидным для программиста, и хотя чтобы писать программы нужно знать очень много, для простых задач может хватить часа изучения языка
2. Самый главный инструмент — наглость и смелость, а также умение гуглить то, что не знаешь)
3. Самая крутая черта — правильно поставить задачу. Чем точнее вы можете сформулировать её, тем проще расписать дня неё решение

Если у вас возникли проблемы с задачей выше, здесь вы найдете ответ к ней со всеми объяснениями — ||пусто||
Для игры в "Пирамидку" советую почитать о массивах  
  
Замечательный источник информации  
https://learn.javascript.ru/array  
Досвидания!
