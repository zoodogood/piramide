/* Задача: Написать алгоритм и превратить три не отсортированных массива в один отсортированный (от большего к меньшему)
Для взаимодействия существует лишь одна публичная функция step (см. ниже) */

class Game extends EventEmitter {
    #arrayList
    #score
    #arraySize
    #arrayCount
    #win

    constructor({count: arrayCount = 3, size: arraySize = 15}){
      super();

      if (arrayCount < 3){
        throw new Error("Minimum count — three array");
      }

      if (arraySize < 4){
        throw new Error("Minimum size — four slabs");
      }

      this.#arrayCount = arrayCount;
      this.#arraySize  = arraySize;
      this.generate();
    }



    get list(){
      /* Создаются копии массивов */
      return [...this.#arrayList].map(arr => [...arr]);
    }



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
      Возвращает массив to
    */
    step(from = 0, to = 2){
      let first = this.#arrayList[from], second = this.#arrayList[to];

      if (from < 0 || to > this.#arraySize){
        throw new Error(`Cannot step from ${from} to ${to}`);
      }

      if (first.length === 0){
        throw new Error("You are trying to pull out an element of an empty array");
      }

      second.push( first.pop() );
      this.#upScore();
      this.#checkFilling();

      this.emit("step", {from, to});
      return second;
    }




    #checkFilling(){
      let full = this.#arrayList.find(arr => arr.length === this.#arraySize);
      if (!full){
        return;
      }

      let notSortedItem = full.find((num, index) => this.#arraySize - num !== index);

      if (notSortedItem){
        return;
      }

      this.#playerWinner();
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
        size: this.#arraySize
      }
    }



    #playerWinner(){
      this.emit("win");
      this.#win = true;
    }

    isWin(){
      return !!this.#win;
    }
}
