function delay(ms){
  return new Promise(res => setTimeout(res, ms));
}


function ending(numb = 0, wordBase, zerofifth, first, second, opt = {}) {
  numb = Number(numb) || 0;
  let fix = Infinity;

  if (numb > 20) fix = 10;
  let end = (numb % fix > 4 || numb % fix == 0) ? zerofifth : (numb % fix > 1) ? second : first;

  input = wordBase + end;
  if (opt.bold) {
    numb = "**" + numb + "**";
  }
  if (!opt.slice){
    input = numb + " " + input;
  }
  return input;
};



function random(...arguments){
  let lastArgument = arguments.splice(-1)[0];
  let options = {round: true};

  if (typeof lastArgument === "object"){
    Object.assign(options, lastArgument);
    lastArgument = arguments.splice(-1)[0];
  }

  const max = lastArgument + Number(options.round);
  const min = arguments.length ? arguments[0] : 0;
  let rand = Math.random() * (max - min) + min;

  if (options.round){
    rand = Math.floor(rand);
  }
  return rand;
}


function displayDate({ ms = 0 }){
  let now = Date.now();

  if (now - ms < 86_400_000)
    return "Сегодня, " + new Intl.DateTimeFormat("ru-ru", { hour: "2-digit", minute: "2-digit" }).format(ms);

  if (now - ms < 172_800_000)
    return "Вчера, " + new Intl.DateTimeFormat("ru-ru", { hour: "2-digit", minute: "2-digit" }).format(ms);

  else
    return new Intl.DateTimeFormat("ru-ru", { day: "2-digit", month: "2-digit" }).format(ms);

}



Object.defineProperty(Array.prototype, "random", {
  value: function (pop, weights){
    let index;
    if (weights) {
      let last = 0;
      let limites = this.map((e, i) => last = e._weight + last);

      let rand = Math.random() * limites.at(-1);
      index = limites.findIndex(e => e >= rand);
    }
    else index = Math.floor(Math.random() * this.length);

    let input = this[index];
    if (pop) this.splice(index, 1);
    return input;
  }
});



class Timeout {
  #identificator
  #timer
  #end
  #freeze

  constructor(callback, timer){
    this.callback = callback;
    this.#timer   = timer;

    this.launch();
    return this;
  }



  clear(){
    clearTimeout( this.#identificator );
    this.#identificator = null;

    this.#end    = undefined;
    this.#freeze = undefined;

    return this;
  }


  launch(){
    let ms = this.checkFreeze() || this.#timer;

    this.clear();

    this.#identificator = setTimeout(this.callback, ms);
    this.#end = Date.now() + ms;


    return this;
  }


  freeze(){
    let timeLeft = this.getEndTimestamp() - Date.now();
    this.clear();
    this.#freeze = timeLeft;
    return this;
  }

  checkFreeze(){
    return this.#freeze ?? 0;
  }


  update(){
    this.clear();

    this.launch();
    return this;
  }


  setMilliseconds(ms){
    this.#timer = ms;
    return this;
  }


  getEndTimestamp(){
    return this.#end;
  }

}




// Функция для трансформаций
// Синтаксис применения HTMLElement.transform({property: "scale", value: 1.2, ms: 200})
Object.defineProperty( HTMLElement.prototype, "transform", {
  value: async function ({ value, property, ms }){
    // Строка текущих трансформаций
    let now  = this.style.transform;

    if ( ms )
      this.style.transitionDuration = `${ ms }ms`;

    let reg = new RegExp(`${ property }\\s?\\((.+?)\\)`, "i");
    let alreadyIncludes = now.match( reg );

    if (alreadyIncludes){
      this.style.transform = now.replace(alreadyIncludes[0], `${ property }(${ value })`);
      await delay(ms);
      return;
    }

    this.style.transform += ` ${ property }(${ value })`;
    await delay(ms);
    return;
  }
});


function setDisableStatusForNodeBySelector(selector, disabled = true){
  const node = document.querySelector(selector);
  disabled ? node.setAttribute("disabled", true) : node.removeAttribute("disabled");
}