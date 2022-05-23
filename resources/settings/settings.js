

// ---
let codeareaStyle = document.createElement("link");
codeareaStyle.href = `resources/highlight/styles/${ params.codeSyntax }.min.css`;
codeareaStyle.rel  = "stylesheet";
codeareaStyle.id   = "syntax-CSS";
document.body.append(codeareaStyle);

console.warn = () => {}
// ---



class CreatorElement {
  constructor(innerElement, textContent = "Добавить"){
    let element = document.createElement("div");
    element.classList.add("creator-element");
    element.textContent = textContent;

    element.addEventListener("click", () => this.clickHandle());

    this.innerElement = innerElement;
    this.element = element;
  }

  clickHandle(){
    let inner = typeof this.innerElement === "function" ? this.innerElement() : this.innerElement;
    this.element.parentNode.insertBefore(inner, this.element);
  }
}


class SelfDestroyedElement {
  constructor(element){
    element.classList.add("self-destroy-element");

    this.element = element;

    this.setCloseButton();
  }

  setCloseButton(){
    const close = document.createElement("div");
    close.title = "Убрать элемент"

    close.insertAdjacentHTML("afterbegin",
      `<svg viewPort="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <line x1="1" y1="11"
              x2="11" y2="1"
              stroke-width="2"/>
        <line x1="1" y1="1"
              x2="11" y2="11"
              stroke-width="2"/>
      </svg>`
    );

    close.classList.add("self-destroy-_close-element");

    close.addEventListener("click", () => close.parentNode.remove(), {once: true});
    this.element.append( close );
  }
}








// Основные кнопки — выйти, сохранить, отменить.
const
  buttonExit  = document.getElementById("button-exit").parentNode,
  buttonSave  = document.getElementById("button-save").parentNode,
  buttonReset = document.getElementById("button-reset").parentNode


document.addEventListener("keydown", e => {

  if (e.code === "Escape"){
    buttonExit.click();
    return;
  }

  if (e.code === "KeyS" && e.ctrlKey){
    buttonSave.click();
    buttonSave.focus();

    e.preventDefault();
    return;
  }


  if (e.code === "KeyR" && e.ctrlKey){
    buttonReset.click();
    buttonReset.focus();

    e.preventDefault();
    return;
  }


});



buttonExit.addEventListener("click", e => {
  // Меняет страницу
  let href = document.location.href.replace("/resources/settings", "");
  document.location.href = href;
  document.activeElement.blur();
});




buttonSave.addEventListener("click", e => {
  let newest = InputAction.changes;

  localStorage.setItem( "userParams", JSON.stringify(newest) );
  document.activeElement.blur();
  buttonSave.parentNode.classList.remove("clickMe");
});




buttonReset.addEventListener("click", e => {
  InputAction.changes = {};
  InputAction.loadParams();
  document.activeElement.blur();
});














// Действия при использовании инпутов, а также их изменение, когда значение было установлено извне
class InputAction {
  constructor(elementId, {eventType = "input"} = {}){
    this.element = document.getElementById( elementId );
    this.element.addEventListener(eventType, e => this.action(this, e));
  }



  connect(valueName){
    let constructor = this.constructor;

    valueName ||= this.element.id;

    if (typeof constructor.events[valueName] !== "object")
      constructor.events[valueName] = [];

    constructor.events[valueName].push(this);

    this.connectedValue = valueName;
    return this;
  }

  init(callback){
    callback( this );
    return this;
  }



  setAction(func){
    this.action = func;
    return this;
  }



  setDisplay(func){
    this.display = func;
    return this;
  }



  static setValue(valueName, value){
    InputAction.changes[valueName] = value;

    if ( !this.events[valueName] )
      throw new Error(`valueName without handler`);

    this.events[valueName].forEach( inputAction => inputAction.display(inputAction, value) );
  }



  static loadParams(){
    let params = localStorage.getItem("userParams");
    if (!params)
      params = localStorage["userParams"] = "{}";


    params = JSON.parse(params);

    Object.keys( this.defaultValues ).forEach( k => {
      this.setValue( k, params[ k ] ?? this.defaultValues[ k ] );
    });

  }


  static events  = {};

  static changes = {};

  static defaultValues = Params.defaultValues;


}






new InputAction("launchOnStart").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    input.element.checked = value;
  });

new InputAction("multiSlab").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    input.element.checked = value;
  });

new InputAction("activatePoligon").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    input.element.checked = value;
  });


new InputAction("slabsSpeedRange").connect("slabsSpeed")
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.value);
  })
  .setDisplay((input, value) => {
    input.element.value = value;
  });


new InputAction("slabsSpeed").connect("slabsSpeed")
  .setAction(input => {
    let element = input.element;

    if ( !element.value )
      return;

    if ( +element.value > 100 )
      element.value = 100;


    if ( +element.value < 1 )
      element.value = 1;


    InputAction.setValue(input.connectedValue, element.value);
  })
  .setDisplay((input, value) => {
    input.element.value = value;
  });

new InputAction("background").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.value);
  })
  .setDisplay((input, value) => {
    value = value.replace(/background(\S)*?:|\n|;/g, "").trim();
    input.element.value = value;
    input.element.style.width = value.length * 7.7 + "px";
  });

new InputAction("colorizeFunc", {eventType: "click"}).connect()
  .setAction(async input => {
    input.element.parentNode.children[ 3 ].style.display = "none";

    let parse = [...input.element.parentNode.children[ 1 ].children]
      .slice(0, -1)
      .map(form => {
        let span = form.children[0];

        let [func, weight] = [...span.children]
          .filter(e => e.nodeName === "INPUT")
          .map(e => e.value);

        if ( weight === "" )
          weight = 0;

        if ( func === "" )
          return null;

        return { func: func.replaceAll(`"`, `'`), _weight: +weight };
      });
    await InputAction.setValue(input.connectedValue, parse);
  })
  .setDisplay((input, value) => {
    let form = input.element.parentNode.children.item(1);
    form.innerHTML = "";

    const cololizeToHTML = obj => {
      const element = document.createElement("div");
      const inputStyle = `style = "max-width: calc(100% - 22px); width: 800px; white-space: pre-wrap; height: 30px;"`;
      const oddsStyle = `style = "min-width: 0px; width: 35px;"`;

      const placeholderColors = [...new Array(6)].map((_, i) => i18n(`settings-action-colorizeFunc-form-function-placeholderColor-#${ i + 1 }`));
      element.innerHTML = `
        <span class = "spacing margin-top">
          ${ i18n("settings-action-colorizeFunc-form-function") } <br><input ${ inputStyle } class="content-input" placeholder = "${ placeholderColors.random() }" value = "${ obj.func }"></input><br>
          ${ i18n("settings-action-colorizeFunc-form-odds") } <br><input class="content-input" ${ oddsStyle } type = "number" placeholder = "0" value = "${ obj._weight }"></input>
        </span><br><br><br>
      `;
      return new SelfDestroyedElement( element );
    };

    value
      .filter(e => e)
      .forEach(obj => form.append( cololizeToHTML(obj).element ));


    const creator = new CreatorElement( () => cololizeToHTML({ func: "", _weight: "" }).element, i18n("settings-action-colorizeFunc-form-new") );
    form.append( creator.element );
  });

new InputAction("removeLibrary").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    input.element.checked = value;
  });

new InputAction("letItSnow").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay(async (input, value) => {
    input.element.checked = value;

    if (!value){
      document.querySelector(".canvas-snow")?.remove();
      return;
    }

    if (!document.getElementById("LetItSnow")){
      let element = document.createElement("script");
      element.src  = `classes/LetItSnow.js`;
      element.id   = "LetItSnow";
      document.body.append(element);
      await new Promise(res => (element.onload = res));
    }

    new SnowBackground();


  });

new InputAction("codeSyntax", {eventType: "change"}).connect()
  .init(input => {
    let inner = ["a11y-dark", "16gray", "atom-one-dark", "atom-one-dark2", "black", "codepen-embed", "devibeans", "github", "github-dimmed", "gml", "gradient", "helios", "monokai", "myBonus", "nord", "owl", "purple", "studio"]
      .map(font => `<option data-name = "${font}" value = ${font}>${font}</option>`).join("");

    input.element.innerHTML = inner;
    input.element.parentNode.querySelector(".hljs")
      .textContent = localStorage.getItem("userCode") || "const game = new Game({size: 15, count: 10}).visualize();";
  })
  .setAction((input, e) => {
    InputAction.setValue(input.connectedValue, input.element.value);
  })
  .setDisplay((input, value) => {
    input.element.value = value;

    document.getElementById("syntax-CSS").href = `resources/highlight/styles/${ value }.min.css`;
    let codePreview = input.element.parentNode.querySelector(".hljs");
    hljs.highlightElement(  codePreview  );
  });

new InputAction("codeSize").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.value);
  })
  .setDisplay((input, value) => {
    input.element.value = value;
    input.element.parentNode.querySelector("details")
      .style.fontSize = `${ value / 100 }em`;
  });

new InputAction("clearedConsole").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {

    input.element.checked = value;
  });

new InputAction("menuThemeDark").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    document.body.style.backgroundImage = value ? "linear-gradient(90deg, #621717, #000000 16%)" : "";
    input.element.checked = value;
  });


new InputAction("menuButtonsColor").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.value);
  })
  .setDisplay((input, value) => {
    input.element.value = value;
    document.documentElement.style.setProperty('--buttonsMainColor', `hsl(${value}, 35%, 55%)`);
  });


new InputAction("strangeClick").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    input.element.checked = value;
  });


new InputAction("disableCustomScroll").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    input.element.checked = value;
  });


new InputAction("alternativeConsole").connect()
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    input.element.checked = value;
  });

new InputAction("lang", {eventType: "change"}).connect()
  .setAction(async input => {
    const value = input.element.value;
    InputAction.setValue(input.connectedValue, value);

    const description = input.element.parentNode.querySelector("small");
    const glitch = new GlitchText(description.textContent, i18n("settings-action-lang-changesAfterRefresh"), {step: 2});
    for (content of glitch){
      await delay(5);
      description.textContent = content;
    }
  })
  .setDisplay((input, value) => {
    I18nManager.setLang(value);
    input.element.value = value;
  });




InputAction.loadParams();















window.addEventListener("beforeunload", e => {
  let before  = localStorage.getItem("userParams");
  let changes = JSON.stringify( InputAction.changes );

  if ( before !== changes )
    e.returnValue = "Ваши изменения не сохранены, продолжить?";

  buttonSave.parentNode.classList.add("clickMe");
});


I18nManager.replaceAll();
