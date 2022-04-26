(() => {

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

  nativeConsole[type](...args);
  Console.messages.push(obj);
  Console.events.emit("log", obj);
}


console.log   = (...args) => log('log',   ...args);
console.warn  = (...args) => log('warn',  ...args);
console.error = (...args) => log('error', ...args);
console.debug = (...args) => log('debug', ...args);

console.clear = () => {
  Console.messages = [
    {
      type: 'clean',
      content: 'Консоль очищена.'
    }
  ];

  nativeConsole['clear']();
  Console.events.emit("clear");
};

console.native = nativeConsole;






class Console {
  constructor({ container }){
    container.className = "console-container";

    this.container = container;

    this.loggs     = this.#createListNode(container);
    this.inputNode = this.#createInputNode(container);

    let pushMessage = this.#push.bind(this);
    this.constructor.events.on("log", pushMessage);
    this.constructor.messages.forEach( pushMessage );
  }


  #push(msg){
    const node = document.createElement("span");
    node.textContent = msg.content.trim();

    node.className = `console-msg console-msg-${ msg.type }`;
    this.loggs.node.append(node);
  }


  #clear(){
    this.loggs.node.innerHTML = "";
  }


  #createListNode(){
    const component = new ListNode();
    this.container.append(component.node);
    return component;
  }

  #createInputNode(){
    const component = new InputNode();
    this.container.append(component.node);
    return component;
  }

  static TYPES = {

  }

  static messages = [];

  static events = new EventEmitter();
}





class InputNode {
  constructor(){
    this.node = document.createElement("input");
    this.node.className = "console-node-input";

    this.node.onchange = this.#changeHandle.bind(this);
    this.node.setAttribute("placeholder", this.constructor.PLACEHOLDER);
  }

  #changeHandle(changeEvent){
    const input = changeEvent.target.value;

    let output, type = "log";

    try
    {
      const value = eval( input );
      output = JSON.stringify( value, null, 3 );
    }
    catch (err)
    {
      type = "error";
      let { name, message } = err;
      name    ||= "Uncaused";
      message ||= "";

      output = `${ name }\n${ message || "" }`;
    }

    console[type](`> ${ input };\n${ output }`);
    changeEvent.target.value = "";
  }

  static PLACEHOLDER = "Введите 2 + 2 . . .";
}


class ListNode {
  constructor(){
    this.node = document.createElement("ul");
    this.node.className = "console-node-loggs";
  }
}

globalThis.Console = Console;
})();
