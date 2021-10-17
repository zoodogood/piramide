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
    Alert.create(err.message, "error", "Просто ошибка");
    console.error(err);
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
    let move = steps.shift();
    await moveSlab(move);
  }

  stepsHandler.handle = false;
}
