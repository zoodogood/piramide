(() => {

const METHODS_TYPES = {
  "default": {
    toElement: (...args) => {
      const node = document.createElement("span");

      node.textContent = args
        .map(contents => {
          if (typeof content === "object")
            contents = JSON.stringify(contents, null, 2);

          return contents;
        })
        .join("\n");

      return node;
    }
  },

  "clear": {
    useBefore: () => {
      Console.events.emit("clear");
      Console.messages = [];
    },
    toElement: () => {
      const node = document.createElement("span");
      node.textContent = "Консоль очищена.";
      return node;
    }

  }
};

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
console.native = nativeConsole;


class LogResolve {
  static log(type, ...args){
    const message = {type, args};
    const typeInfo = METHODS_TYPES[type] || METHODS_TYPES.default;
    typeInfo.useBefore?.(...args);

    const node = LogResolve.takeNode(message);



    nativeConsole[type](...args);
    Console.messages.push(message);
    Console.events.emit("log", node, message);
  }


  static takeNode(message){
    const typeInfo = METHODS_TYPES[ message.type ] || METHODS_TYPES.default;
    const node = typeInfo.toElement(message.args);
    node.classList.add("console-msg", `console-msg-${ message.type }`);

    return node;
  }
}










class Console {
  constructor({ container }){
    container.className = "console-container";

    this.container = container;

    this.loggs     = this.#createListNode(container);
    this.inputNode = this.#createInputNode(container);


    this.#setHandlers();
    this.#fillLogger();
  }


  #append(node, message){
    LogResolve.takeNode(node)
    node = node.cloneNode(true);

    const typeInfo = METHODS_TYPES[ message.type ] || METHODS_TYPES.default;
    if ("specialProperties" in typeInfo)
      node.specialProperties(node);

    this.loggs.node.append(node);
  }


  #clear(){
    this.loggs.node.innerHTML = "";
  }

  #setHandlers(){
    const appendMessage = this.#append.bind(this);
    this.constructor.events.on("log", appendMessage);

    this.constructor.events.on("clear", () => this.loggs.node.textContent = "");
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

  #fillLogger(){
    this.constructor.messages
      .map(message => {
        const node = LogResolve.takeNode(message);
        return {node, message};
      })
      .forEach( ({node, message}) => this.#append(node, message) );
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

Object.keys(nativeConsole)
  .forEach(key => {
    const method = (...args) => LogResolve.log(key, ...args);
    console[ key ] = method;
  });


})();
