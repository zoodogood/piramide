
class ModalWindow {

    constructor({
       size: {
         width  = 300,
         height = 300,
         resize = true,
         minWidth = 200,
         minHeight = 200
       },
       canClose = true
    } = {
      size: {}
    }
  )
  {

     let element = document.createElement("article");
     this.element = element;

     element.classList.add("modalWindow");
     Object.assign(element.style, {
       width:     `${ width }px`,
       height:    `${ height }px`,
       minWidth:  `${ minWidth }px`,
       minHeight: `${ minWidth }px`,
       resize:    resize ? "both" : "none"
     });

     this.installMoveElement();
     this.setHandlers();


     document.body.append(element);
     element.modalWindow = this;

     this.createdTimestamp = performance.now();
     ModalsStateManager.addState(this);
  }

  installMoveElement(){
    this.moveElement = new MoveElement().slick(this);
    return this;
  }

  setHandlers(){
    const observer = new MutationObserver(mutationRecords => {
      const removed = mutationRecords.at(-1).removedNodes;
      const isRemoved = [...removed].some(node => node === this.element);

      if (isRemoved)
        this.close();

    });
    observer.observe(document.body, {childList: true});
    this.setHandlers.MutationObserver = observer;
  }

  close(){
    if (this.closed)
      return;

    this.element.remove();
    delete this.element.modalWindow;

    ModalsStateManager.remove(this);

    this.setHandlers.MutationObserver.disconnect();

    this.closed = true;
  }
}


class MoveElement {
  constructor(){
    let element = document.createElement("section");
    this.element = element;

    element.classList.add("move-element");
    element.addEventListener("mousedown", (mouseEvent) => this.mouseDownHandler(mouseEvent));
    this.installCloseElement();
  }


  slick(modalWindow){
    modalWindow.element.append(this.element);
    this.modalWindow = modalWindow;
  }


  async mouseDownHandler(mouseEvent){
    const moveHandler = this.mouseMoveHandler.bind(this, { shiftX: mouseEvent.layerX, shiftY: mouseEvent.layerY });
    document.addEventListener("mousemove", moveHandler);

    let whenMouseUp = await new Promise(res => document.addEventListener("mouseup", res, {once: true}));
    document.removeEventListener("mousemove", moveHandler);
  }


  mouseMoveHandler({shiftX, shiftY}, mouseEvent){
    let {element} = this.modalWindow;

    element.style.left = `${ mouseEvent.x - shiftX }px`;
    element.style.top  = `${ mouseEvent.y - shiftY }px`;
  }


  installCloseElement(){
    this.closeElement = new CloseElement().slick(this);
    return this;
  }
}


class CloseElement {
  constructor(){
    let element = document.createElement("div");
    this.element = element;

    element.classList.add("close-element");
    element.addEventListener("click", (clickEvent) => this.clickHandler(clickEvent));
  }


  slick(moveElement){
    moveElement.element.append(this.element);
    this.moveElement = moveElement;
  }


  clickHandler(){
    this.moveElement.modalWindow.close();
  }
}



class ModalsStateManager {
  static states = [];
  static _data = {lastState: 0};


  static handle(){
    window.addEventListener("popstate", this.popStateHandler.bind(this));
  };


  static remove(modal){
    const index = this.states.indexOf( modal.createdTimestamp );
    if (!~index)
      return;

    this.states.splice(index, 1);


    if (!(this._data.preventNext ^= 1))
      return;

    history.go(-1);
  };


  static addState(modal){
    const timestamp = modal.createdTimestamp;

    history.pushState({modal: timestamp}, "");
    this._data.lastState = timestamp;
    this.states.push(timestamp);
  };


  static popStateHandler(popStateEvent){
    const isBack = popStateEvent.state === null || this._data.lastState > popStateEvent.state.modal;
    this._data.lastState = popStateEvent.state?.modal || 0;

    if (!isBack)
      return;

    if (!(this._data.preventNext ^= 1))
      return;

    const modals = [...document.getElementsByClassName("modalWindow")];
    const node = modals.find(node =>
      node.modalWindow.createdTimestamp === this.states.at(-1)
    );

    if (!node){
      this._data.preventNext = 0;
      return;
    }


    node.modalWindow.close();
  };
}
ModalsStateManager.handle();
