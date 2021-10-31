// Основные кнопки — выйти, сохранить, отменить.
let
  buttonExit  = document.getElementById("button-exit"),
  buttonSave  = document.getElementById("button-save"),
  buttonReset = document.getElementById("button-reset")


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
  let href = document.location.href.replace("/resources/usersettings", "/index");
  document.location.href = href;
  document.activeElement.blur();
});

buttonSave.addEventListener("click", e => {
  let current = localStorage.getItem("userParams");

  let newest = Object.assign( JSON.parse(current), InputAction.changes );

  // Очищаем если равное "по умолчанию"
  Object.entries( newest ).forEach( ([k, value]) => {
    if ( value === InputAction.defaultValues[k] )
      delete newest[ k ];
  });

  localStorage.setItem( "userParams", JSON.stringify(newest) );

  InputAction.changes = {};
  document.activeElement.blur();
});

buttonReset.addEventListener("click", e => {
  InputAction.changes = {};
  document.activeElement.blur();
});





// Действия при использовании инпутов, а также их изменение, когда значение было установлено извне
class InputAction {
  constructor(elementId){
    this.element = document.getElementById( elementId );
    this.element.addEventListener("input", e => this.action(this));
  }



  connect(valueName){
    let constructor = this.constructor;
    if (typeof constructor.events[valueName] !== "object")
      constructor.events[valueName] = [];

    constructor.events[valueName].push(this);

    this.connectedValue = valueName;
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

new InputAction("ignoreOnStart").connect("ignoreOnStart")
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    input.element.checked = value;
  });

new InputAction("multiSlab").connect("multiSlab")
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    input.element.checked = value;
  });

new InputAction("activatePoligon").connect("activatePoligon")
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

new InputAction("colorizeFunc").connect("colorizeFunc")
  .setAction(input => {
    console.log(input);

    InputAction.setValue(input.connectedValue, 111);
  })
  .setDisplay((input, value) => {
    input.element.value = 111;
  });

new InputAction("menuThemeDark").connect("menuThemeDark")
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.checked);
  })
  .setDisplay((input, value) => {
    document.body.style.background = value ? "linear-gradient(90deg, #782222, #000000 16%)" : "";
    input.element.checked = value;
  });


new InputAction("menuButtonsColor").connect("menuButtonsColor")
  .setAction(input => {
    InputAction.setValue(input.connectedValue, input.element.value);
  })
  .setDisplay((input, value) => {
    input.element.value = value;
    document.documentElement.style.setProperty('--buttonsMainColor', `hsl(${value}, 35%, 55%)`);
  });






InputAction.loadParams();





window.addEventListener("beforeunload", e => {
  let before = new Params("userParams").getList();
  let realChanges = Object.keys( InputAction.changes ).filter( k => before[k] !== InputAction.changes[k] );
  if ( realChanges.length )
    e.returnValue = "Ваши изменения не сохранены, продолжить?";

  buttonSave.parentNode.classList.add("clickMe");
});