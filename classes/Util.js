function delay(ms){
  return new Promise(res => setTimeout(res, ms));
}



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


Array.prototype.random = function(pop, weights){
  let index;
  if (weights) {
    let last = 0;
    let limites = this.map((e, i) => last = e._weight + last);

    let rand = Math.random() * limites.last;
    index = limites.findIndex(e => e >= rand);
  }
  else index = Math.floor(Math.random() * this.length);

  let input = this[index];
  if (pop) this.splice(index, 1);
  return input;
}
