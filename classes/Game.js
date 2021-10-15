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
      let full = this.#arrayList.find(arr => arr.length === this.arraySize);
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






// Следующая часть не является частью игры. Она служит лишь для её визуализации на странице.

// Устаналивает цвет плитке, можете настроить по своему хотению и скинуть мне :D
function setSlubColor(number){
  return number % 2 ? "#c6e44e" : "#70d729";
}





const steps = [];
const gameElement = document.querySelector("#game");

const scoreMap = JSON.parse(localStorage.getItem("scoreMap")) || [];
let score = 0;

Game.prototype.visualize = function (){
  this.on("generate", () => generateHandle(this));
  this.on("step", e => stepHandle(this, e));
  this.on("win", () => winHandle(this));


  generateHandle(this);

  return this;
}

// Срабатывает кнопкой Пуск или нажатием пробела
function launch(){
  try {
    eval(codearea.textContent);
  } catch (err) {
    console.error(err.message);
  }
}

// Ну и при старте)
launch();


function generateHandle(game){
  gameElement._game = game;

  if (score){
    scoreMap.push([score, game.isWin()]);
    score = 0;
    localStorage.setItem("scoreMap", JSON.stringify(scoreMap));
  }

  steps.length = 0;

  console.log("%c🦝 Игра сгенерированна. Старт! ", "color: green; padding: 30px;");
  console.log("%cВсе, что вы помещаете в console.log будет отображено здесь!", "padding: 30px;");

  createTowers();
}

function stepHandle(game, move = {from: 0, to: 1}){
  score = game.getScore();
  steps.push(move);

  stepsHandler();
}


function winHandle(game){
  alert(`ЭТО ПОБЕДА! Счёт — ${game.getScore()}`)
}



function createTowers(){
  let game = gameElement._game;

  gameElement.innerHTML = "";
  let list = game.list;

  for (let tower of list) {
    tower = towerHTML(tower);
    gameElement.append(tower);
  }

}

function towerHTML(array){
  let tower = document.createElement("div");
  tower.classList.add("array");

  for (let slab of array) {
    slab = slabHTML(slab);
    tower.append(slab);
  }


  return tower;
}

function slabHTML(number){
  let slab = document.createElement("div");
  slab.classList.add("slab");

  let size = gameElement._game.getGameParams().size;
  slab.style.width           = `${100 / size * number}%`;
  slab.style.height          = `${25 / size}vh`
  slab.style.backgroundColor = setSlubColor(number);

  return slab;
}

async function moveSlab({from, to}){
  let fromTower = gameElement.children.item(from);
  let sameElement = [...fromTower.children][0];
  await delay(15);

  sameElement.style.transform = `translateY(-30vh)`;
  await delay(200);

  let toTower = gameElement.children.item(to);

  // Расстояние между башнями
  let distance = toTower.getBoundingClientRect().left - fromTower.getBoundingClientRect().left;


  sameElement.style.transform = `translateY(-30vh) translateX(${distance}px)`;
  await delay(175);


  let slabsHeight = sameElement.style.height.slice(0, -2) * ( [...fromTower.children].length - 1 - [...toTower.children].length );
  sameElement.style.transform = `translateY(${slabsHeight}vh) translateX(${distance}px)`;
  await delay(200);

  sameElement.style.transition = "";
  sameElement.style.transform = "";
  delete sameElement.style.transition;

  toTower.prepend(sameElement);
  return;
}



async function stepsHandler(){
  if (stepsHandler.handle === true){
    return;
  }

  stepsHandler.handle = true;

  while (steps.length){
    console.log(steps);
    let move = steps.shift();
    await moveSlab(move);
  }

  stepsHandler.handle = false;
}
