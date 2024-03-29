(() => {

if (!userParams.alternativeConsole)
  return;

const METHODS_TYPES = {
  "default": {
    toElement: (...args) => {
      args = args
        .map(contents => {
          if (contents instanceof HTMLElement)
            contents = contents.toString();

          if (typeof contents === "object")
            contents = JSON.stringify(contents, null, 2);

          return contents;
        });

      const node = document.createElement("span");
      const isParsible = args.at(1) && args.at(0).match(/%[csn]/);

      if (isParsible){
        let line = args.shift();
        let currentStyle = "";

        line = line.replaceAll(/%([csn])/g, (full, symbol) => {
          const option = args.shift();
          if (symbol === "c"){
            currentStyle = option;
            return "";
          }

          return `<span style = "${ currentStyle }">${ option }</span>`;
        });

        node.innerHTML = line;
        return node;
      }


      node.textContent = args.join("\n");

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
      node.textContent = i18n("console-clear-message");
      return node;
    }

  },

  "error": {
    toElement: (...args) => {
      const node = document.createElement("span");
      node.textContent = args.map(String).join(";\n");
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
    const typeInfo = LogResolve.getTypeInfo(type);
    typeInfo.useBefore?.(...args);

    const node = LogResolve.takeNode(message);



    nativeConsole[type](...args);
    Console.messages.push(message);
    Console.events.emit("log", node, message);
  }


  static takeNode(message){
    const typeInfo = this.getTypeInfo( message.type );
    const node = typeInfo.toElement(...message.args);
    node.classList.add("console-msg", `console-msg-${ message.type }`);

    return node;
  }

  static getTypeInfo(type){
    return METHODS_TYPES[type] || METHODS_TYPES.default;
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
    LogResolve.takeNode(message)
    node = node.cloneNode(true);

    const typeInfo = LogResolve.getTypeInfo(message.type);
    if ("specialProperties" in typeInfo)
      typeInfo.specialProperties(node);

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
    this.node.setAttribute("placeholder", i18n("console-input-placeholder"));
  }

  #changeHandle(changeEvent){
    const input = changeEvent.target.value;
    changeEvent.target.value = "";

    let output;
    console.log(`%c%s${ input };`, "color: rgba(200, 200, 200, 0.5);", ">  ");

    try
    {
      const value = eval( input );
      output = JSON.stringify( value, null, 3 );
    }
    catch (err)
    {
      console.error(err);
      return;
    }


    console.log( String(output) );
  }
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
