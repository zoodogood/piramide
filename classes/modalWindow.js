
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


     document.body.append(element);
     element.modalWindow = element;
  }

  installMoveElement(){
    this.moveElement = new MoveElement().slick(this);
    return this;
  }

  close(){
    this.element.remove();
    // Нужно Провести оптимизацию с завершением всех слушаетелей
  }
}


class MoveElement {
  constructor(){
    let element = document.createElement("section");
    this.element = element;

    element.classList.add("move-element");
    element.addEventListener("mousedown", (e) => this.mouseDownHandler(e));
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
    element.addEventListener("click", (e) => this.clickHandler(e));
  }


  slick(moveElement){
    moveElement.element.append(this.element);
    this.moveElement = moveElement;
  }


  clickHandler(){
    this.moveElement.modalWindow.close();
  }
}
