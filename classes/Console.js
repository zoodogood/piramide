const nativeConsole = {
    log:    console.log,
    warn:   console.warn,
    error:  console.error,
    debug:  console.debug,
    clear:  console.clear,
    info:   console.info
};

let messages = [];

const log = (type, ...args) => {
    const obj = {
        type,
        text: args.map((value) => {
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
    if (onLog) onLog(obj);
}

let onLog = null;
let onLogClear = null;

console.log   = (...args) => log('log',   ...args);
console.warn  = (...args) => log('warn',  ...args);
console.error = (...args) => log('error', ...args);
console.debug = (...args) => log('debug', ...args);

console.clear = () => {
    messages = [
        {
            type: 'clean',
            text: 'Консоль очищена'
        }
    ];
    
    nativeConsole['clear']();
    if (onLogClear) onLogClear();
};

class Console {
    constructor({container}){
        this.container = container;
        this.container.className = 'console-container';
        onLog = (msg) => this.#add(msg);
        onLogClear = () => this.#clear();

        messages.forEach((v) => this.#add(v));
    }
    #add(msg){
        const div = document.createElement('div');

        msg.text.split('\n').forEach((v) => {
            const el = document.createElement('div');
            el.className = 'console-msg-line';
            v.split('').forEach((char) => {
                if(char == '\n'){
                    el.append(document.createElement('br'));
                    return;
                }
                const span = document.createElement('span');

                if(char == ' ') span.innerHTML = '&nbsp;';
                else span.innerText = char;

                el.append(span);
            });

            div.append(el);
        });

        //p.innerHTML = msg.text.replaceAll(' ', '&nbsp;').replaceAll('\n', '<br/>');
        div.className = `console-msg console-msg-${msg.type}`;
        this.container.append(div);
    }
    #clear(){
        // this.container.innerHTML = '';
    }
}
