/* Задача: Написать алгоритм и превратить три не отсортированных массива в один отсортированный (от большего к меньшему)
Для взаимодействия существует лишь одна публичная функция step (см. ниже) */

class Game extends EventEmitter {
    #arrayList
    #arraySize
    #arrayCount
    #hardmode

    constructor({ count: arrayCount = 3, size: arraySize = 15, hardmode = false }){
      // super — техническая функция вызывающая EventEmmiter — позволяет работать с ивентами
      super();

      if (arrayCount < 3)
        throw new Error("Minimum count — three array");


      if (arraySize < 4)
        throw new Error("Minimum size — four slabs");


      if ( isNaN(arrayCount) || isNaN(arraySize) )
        throw new Error(`Argument's must be a number size — ${ arraySize }, count — ${ arrayCount }`);


      this.#arrayCount = arrayCount;
      this.#arraySize  = arraySize;
      this.#hardmode   = hardmode;
      this.generate();
    }


    /*
      Создается новый Proxy-объект оригинального массива (Это означает, что на массивы напрямую нельзя будет повлиять извне)
      Он будет автоматически изменятся при "Шаге" игры
    */
    get list(){

      // Создание точной копии массива
      let proxyArray = this.#arrayList
        .map( arr => [...arr] );

      const emulate = ({from, to}) => proxyArray.at(to)
        .push(  proxyArray.at(from).pop()  );

      this.on("step", emulate);

      // Очистка при новой генерации
      this.once("generate", () => this.removeListener("step", emulate));
      return proxyArray;
    }


    #score;
    generate(){
      let size  = this.#arraySize;

      // Массив плит от 1 до `size` расположенных в случ. порядке
      let slabs = [...new Array( size )]
        .map((e, i) => i + 1)
        .sort(() => Math.random() - 0.5);



      let count = this.#arrayCount;

      // Создаётся набор Массивов
      this.#arrayList = [...new Array( count )]
        .map(e => []);


      // Все плиты попадают в один из массивов созданных на прошлом этапе
      slabs.forEach(e => this.#arrayList[ random(0, this.#arrayList.length - 1) ].push(e));

      this.nullifyScore();
      this.emit("generate");
    }



    nullifyScore(){
      this.#hasWin = false;
      this.#score  = 0;
    }



    /* Перекидывает последний элемент массива с индексом from в to
      Возвращает массив `to`
    */
    step(from = 0, to = 2){

      if (isNaN(from) || isNaN(to))
        throw new Error(`Argument's must be a number. Current from value — ${ Object.prototype.toString.call(from) }, to — ${ Object.prototype.toString.call(to) }`);

      // Если массива с таким номером не существует
      if (to > this.#arrayCount || from < -this.#arrayCount)
        throw new Error(`Cannot step from array ${from} to ${to}`);


      if (from < 0)
        from = this.#arrayCount + from;

      if (to < 0)
        to = this.#arrayCount + to;


      let
        first  = this.#arrayList[ from ],
        second = this.#arrayList[ to ];


      if (first.length === 0)
        throw new Error("You are trying to pull out an element of an empty array");


      // В хард режиме нельзя класть большую плитку на меньшую
      if ( this.#hardmode && second.at(-1) < first.at(-1) )
        throw new Error(`Into Hardmode You cannot put the larger slab on smaller`);



      this.#upScore();

      second.push( first.pop() );
      this.emit("step", {from, to});

      this.#checkFilling();
      return second;
    }




    #checkFilling(){
      // Ищем заполненный массив
      let full = this.#arrayList.find(arr => arr.length === this.#arraySize);

      // Если такого не существует завершить функцию
      if (!full)
        return false;

      // Проверяем все ли плиты на своих местах
      let notSortedItem = full.find((num, index) => this.#arraySize - num !== index );


      if (notSortedItem)
        return false;

      // Если функция не завершена, здесь ждёт победа!
      this.#playerWinner();
      return true;
    }



    #upScore(){
      this.#score++;
    }



    getScore(){
      return this.#score;
    }



    getGameParams(){
      return {
        count: this.#arrayCount,
        size:  this.#arraySize,
        hard:  this.#hardmode
      }
    }



    // Единожды срабатывает когда пользователь побеждает
    #hasWin;
    #playerWinner(){
      if (this.#hasWin)
        return;

      this.emit("win");
      this.#hasWin = true;
    }



    // Проверка на то, одержал ли победу пользователь
    get hasWin(){
      return !!this.#hasWin;
    }



    // Устаналивает кастомное расположение плит
    // Не должно использоваться в обычной игре
    _setUserArray( array ){


      const comprises = (arr) => arr instanceof Array && arr.every(n => typeof n === "number");
      let isArrayList = array.every(comprises);

      if ( !isArrayList )
        throw new Error("Bad structure. Expected — [  [1,2,3], [], [7, 5], [6]  ] ");

      this.#arrayList = array.map(arr => [...arr]);

      this.#arrayCount = array.length;
      this.#arraySize  = array.reduce((acc, arr) => acc + arr.length, 0);

      this.nullifyScore();

      this.emit("generate");
    }


}
