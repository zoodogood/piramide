/* Задача: Написать алгоритм и превратить три не отсортированных массива в один отсортированный (от большего к меньшему)
Для взаимодействия существует лишь одна публичная функция step (см. ниже) */

class Game extends EventEmitter {
    #arrayList
    #arraySize
    #arrayCount
    #hardmode

    constructor({ count: arrayCount = 3, size: arraySize = 15, hardmode = false }){
      super();

      if (arrayCount < 3)
        throw new Error("Minimum count — three array");


      if (arraySize < 4)
        throw new Error("Minimum size — four slabs");


      if ( isNaN(arrayCount) || isNaN(arraySize) )
        throw new Error(`Argument's must be a number size — ${arraySize}, count — ${arrayCount}`);


      this.#arrayCount = arrayCount;
      this.#arraySize  = arraySize;
      this.generate();
    }


    /* Создаются копии массивов */
    get list(){
      return [...this.#arrayList].map(arr => [...arr]);
    }


    #score;
    generate(){
      let size  = this.#arraySize;
      let count = this.#arrayCount;

      let slabs = [...new Array(size)]
        .map((e, i) => i + 1)
        .sort(() => Math.random() - 0.5);

      this.#arrayList = [...new Array(count)]
        .map(e => []);

      slabs.forEach(e => this.#arrayList[ random(0, this.#arrayList.length - 1) ].push(e));

      this.#score = 0;
    }



    /* Перекидывает последний элемент массива с индексом from в to
      Возвращает массив `to`
    */
    step(from = 0, to = 2){
      let first = this.#arrayList[from], second = this.#arrayList[to];

      if (from < 0 || to > this.#arraySize)
        throw new Error(`Cannot step from array ${from} to ${to}`);


      if (first.length === 0)
        throw new Error("You are trying to pull out an element of an empty array");


      if (isNaN(from) || isNaN(to))
        throw new Error(`Argument's must be a number. from — ${from}, to — ${to}`);


      second.push( first.pop() );
      this.#upScore();
      this.#checkFilling();

      this.emit("step", {from, to});
      return second;
    }




    #checkFilling(){
      let full = this.#arrayList.find(arr => arr.length === this.#arraySize);

      if (!full)
        return false;


      let notSortedItem = full.find((num, index) => this.#arraySize - num !== index);

      if (notSortedItem)
        return false;


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
        size:  this.#arraySize
      }
    }



    #win;
    // Срабатывает когда пользователь побеждает
    #playerWinner(){
      this.emit("win");
      this.#win = true;
    }

    // Проверка на то, одержал ли победу пользователь
    isWin(){
      return !!this.#win;
    }


}
