class SnowBackground {
  constructor(){
    this.canv = document.createElement("canvas");
    this.ctx  = this.canv.getContext("2d");

    this.canv.width  = window.innerWidth;
    this.canv.height = window.innerHeight;
    Object.assign(this.canv.style, this.constructor.styles);

    document.body.append(this.canv);
  }

  static styles = {
    pointerEvents: "none",
    background: "none", //rgba(0, 0, 144, 0.02)
    position: "fixed",
    zIndex: "5"
  }
}
