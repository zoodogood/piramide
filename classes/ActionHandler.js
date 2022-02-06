class ActionHandler {
  #prevent = false;

  constructor(){
    this[Symbol.asyncIterator] = this.iteratorFunction;
    this.events = new EventEmitter();

    this.trace = [];
    this.index = 0;
  }



  iteratorFunction(){
    return { next: this.iteratorNext.bind(this) };
  }



  async iteratorNext(){

    if ( this.#prevent ){
      this.#prevent = false;
      this.trace    = [];
      this.index    = 0;
      return {
        done: true,
        value: { trace: this.trace, index: this.index }
      };
    }


    // Очередь
    if ( this.trace.length <= this.index )
      await new Promise(res => this.events.once("push", res));

    let action = this.trace[ this.index++ ];

    let promise = action.func( action );
    promise.action = action;
    this.processed.push( promise );

    let data = {
      action,
      next: this.trace.at( this.index ),
      trace: this.trace,
      processed: this.processed
    };

    /*
      Если функция allowNext существует и возвращает истину,
      То досрочно запустить следующее действие
      Иначе ждать завершения всех текущих активных действий
    */
    if ( await action.allowNext?.( data ) )
      return { done: false, value: "pending" };

    let values = await Promise.all( this.processed );
    this.processed = [];
    return { done: false, value: values };
  }



  async handle(){
    let iterable = this;

    if ( this.trace.length )
      this.preventHundle();

    this.processed = [];

    for await (let values of iterable)
      this.events.emit("chunkHandled", values);
  }



  preventHundle({ clear = false } = {}){
    this.push( {type: "beforeEnd"} );
    this.#prevent = true;
    this.push( {type: "afterEnd"} );

    if (clear) this.trace = [];
  }



  push( action ){
    this.trace.push( action );
    this.events.emit("push", action);
  }


}
