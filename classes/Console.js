const nativeConsole = {
  log:    console.log,
  warn:   console.warn,
  error:  console.error,
  debug:  console.debug,
  clear:  console.clear,
  info:   console.info,
  group:  console.group,
  table:  console.table
};

let messages = [];

const log = (type, ...args) => {
  const obj = {
    type,
    content: args.map((value) => {
      if (typeof value == 'object')
          return JSON.stringify(value, null, 2);

      if (typeof value == 'number')
          return value.toString();

      if (typeof value == 'string')
          return value;

      return String(value);
    }).join(' '),
  };
  messages.push(obj);
  nativeConsole[type](...args);

  Console.events.emit("log", obj);
}


console.log   = (...args) => log('log',   ...args);
console.warn  = (...args) => log('warn',  ...args);
console.error = (...args) => log('error', ...args);
console.debug = (...args) => log('debug', ...args);

console.clear = () => {
  messages = [
    {
      type: 'clean',
      content: 'Консоль очищена'
    }
  ];

  nativeConsole['clear']();
  Console.events.emit("clear");
};


class Console {
  constructor({ container }){
    this.container = container;
    this.container.className = 'console-container';
    this.constructor.events.on("log", this.#push.bind(this));

    messages.forEach((v) => this.#push(v));
  }


  #push(msg){
    const node = document.createElement("span");
    node.textContent = msg.content.trim();

    node.className = `console-msg console-msg-${ msg.type }`;
    this.container.append(node);
  }


  #clear(){
    this.container.innerHTML = '';
  }


  static events = new EventEmitter();
}
