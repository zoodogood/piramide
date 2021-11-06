

/***
  README :)
  Полигон — система в которой пользовательский код выполняется в независимой среде со статичными параметрами
  Рассматривайте это как роботов гугл, которые посещают сайт и собирают о нём информацию

  За запуск всего этого чуда отвечает Poligon.execute() и запускается сья машина в момент Визуализации победы (именно в момент визуализации)
*/


class Poligon {
  #takeCode
  #game = null

  constructor( { limit = 15000 } ){
    this.limit = limit;
    this.events = new EventEmitter();
  }



  async #execute( code ){
    let poligon = this;
    code = code.replace(/(?<=[^A-Za-zА-Яа-яёъь$_])Game(?=[^A-Za-zА-Яа-яёъь$_])/g, "PoligonGame");

    code =
      `
      poligon.promise = new Promise(async (resolve, reject) => {
        poligon.resolve  = resolve;
        poligon.reject   = reject;
        try {
          ${ code }
        }
        catch(err){
          reject(err);
        }
      });
      `;

    await eval(code);
    return poligon.promise;
  }


  async launch(){
    let takeCode = this.#takeCode;

    if (typeof takeCode !== "function")
      throw new Error("Poligon haven't function code");

    let promise;
    promise = await this.#execute( takeCode() ).catch(err => promise = err);

    this.#game = null;

    this.events.emit("end", promise);
  }


  setTakeCode(callback){
    this.#takeCode = callback;
  }


  setGame(game){
    let out = this.#game = this.#game ? null : game;

    this.events.emit("start", out);
    return out;
  }
}






class PoligonGame extends Game {

  #poligon
  constructor( params ){
    super( params );
    this.#poligon = this.constructor.poligon;
    this._setUserArray( this.constructor.BALANCED_ARRAY );

    this.activateStops( this.#poligon.reject );

    // Если алгоритм уже установлен, вызвать исключение
    if ( !this.#poligon.setGame(this) ){
      this.#poligon.reject( "re-generated" );
      return;
    }

    this.on( "win", e => this.#poligon.resolve(this) );
  }


  visualize(){
    return this;
  }


  async activateStops( reject ){

    let timeout = new Timeout( () => this.#poligon.reject( "inactivity" ), 3000 );

    this.on("generate", () => this.#poligon.reject( "re-generated" ));

    this.on("step", () => {
      timeout.update();
      if (this.getScore() > this.#poligon.limit)
        this.#poligon.reject( "limit" );
    });

  }


  static setPoligon( poligon ){
    this.poligon = poligon;
  }


  static BALANCED_ARRAY =
  [
    [ 1, 3, 4, 16, 8, 9, 21, 11, 25, 27, 13, 17, 20, 23, 28 ],
    [ 30, 7, 5, 12, 18, 24, 29 ],
    [ 6, 22, 10, 15, 26 ],
    [ 14, 2, 19 ],
    [ ]
  ];

}



// Ведёт журнал
class Record {
  constructor({ timestamp, details = 0, type = "victory" }){

  }
}
// const poligonLog = JSON.parse(localStorage.getItem("poligonLog")) || [];

// if (this.score){
//   poligonLog.push([this.score, game.hasWin]);
//   this.score = 0;
//   localStorage.setItem("poligonLog", JSON.stringify(poligonLog));
// }









  const poligon = new Poligon( { limit: 5000 } );
  poligon.setTakeCode(() => codearea.textContent);

  PoligonGame.setPoligon( poligon );

  poligon.events.on("end", e => {
    let type = e instanceof PoligonGame ? "victory" : "reject";
    let details = type === "victory" ? e.getScore() : e;
    new Record({ timestamp: Date.now(), type, details });

    console.info(
      `Полигон завершён --- Резул.: ${
        type === "victory" ?
          `Победа! ${ ending(details, "Шаг", "ов", "", "а") }` :
          `Неудача. ${details}`
      } ---`
    );
  });

  poligon.events.on("start", () => console.info("Полигон запущен ---"));
