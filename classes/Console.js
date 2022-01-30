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
      content: 'Консоль очищена.'
    }
  ];

  nativeConsole['clear']();
  Console.events.emit("clear");
};


class Console {
  constructor({ container }){
    container.className = "console-container";

    let logsNode  = this.#createListNode(container);
    let inputNode = this.#createInputNode(container);

    this.loggs = logsNode;
    this.inputNode = inputNode;

    let pushMessage = this.#push.bind(this);
    this.constructor.events.on("log", pushMessage);
    messages.forEach( pushMessage );
  }


  #push(msg){
    const node = document.createElement("span");
    node.textContent = msg.content.trim();

    node.className = `console-msg console-msg-${ msg.type }`;
    this.loggs.append(node);
  }


  #clear(){
    this.loggs.innerHTML = "";
  }


  #createListNode(container){
    const node = document.createElement("ul");
    node.className = "console-loggs";
    container.append(node);
    return node;
  }

  #createInputNode(container){
    const node = document.createElement("input");
    node.className = "console-input";
    container.append(node);

    node.onchange = (changeEvent) => {
      const nodeValue = changeEvent.target.value;

      let evalValue, type = "log";

      try {
        evalValue = JSON.stringify( eval( nodeValue ), null, 3 );
      }
      catch (err){
        type = "error";
        evalValue = `${ err.name }\n${ err.message }`;
      }

      console[type](`> ${ nodeValue };\n${ evalValue }`);
      changeEvent.target.value = "";
    }

    node.setAttribute("placeholder", "Введите 2 + 2 . . .");
    return node;
  }


  static events = new EventEmitter();
}
