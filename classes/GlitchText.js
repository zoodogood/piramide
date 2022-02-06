class GlitchText {
  constructor(from = "", to = "hello, world", {speed = 1} = {}){
    this.from = from;
    this.to   = to;

    this.speed = speed;

    this[Symbol.iterator] = this.iteratorFunction;
  }

  *iteratorFunction(){
    let word = [...this.from];
    const target = this.to;

    while (word.length !== target.length){
      if (word.length > target.length)
        word.pop();

      if (word.length < target.length)
        word.push("#");

      word = word.map(e => String.fromCharCode( random(20, 40) ));
      yield word.join("");
    }



    while ( word.join("") !== target ){

      word.forEach((letter, i) => {
        if (letter === target[i]){
          return;
        }

        let charCode = letter.charCodeAt(0), targetCode = target[i].charCodeAt(0);
        word[i] = String.fromCharCode( charCode >= targetCode ? charCode - 1 : Math.ceil(15 * this.speed) + charCode );
      });

      yield word.join("");
    }


    return;
  }
}
