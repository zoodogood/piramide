
class SnowBackground {
  #particlesCount
  #createStorms
  #_observer
  #resizeHandle

  constructor( { particlesCount = 70, particlesParams = {}, createStorms = true} = {} ){
    this.canv = document.createElement("canvas");
    this.ctx  = this.canv.getContext("2d");

    this.canv.classList.add("canvas-snow");

    this.#particlesCount = particlesCount;
    this.#createStorms   = createStorms;

    this.#resizeHandle = this.#resize.bind(this);
    this.#resizeHandle();
    window.addEventListener("resize", this.#resizeHandle);

    // Очистит цикл при удалении элемента из DOM
    this.createObserver();
    Object.assign(this.canv.style, this.constructor.styles);

    document.body.append(this.canv);

    this.particlesParams = Object.assign({...particlesParams}, this.constructor.particlesDefaultParams);
    this.init();
  }



  setParticlesParams(params){
    this.particlesParams = {};
    Object.assign( this.particlesParams, params );
  }



  init(){
    this.particlesList = [...new Array( this.#particlesCount )].map( () => new Particle(this.particlesParams) );
    this.frame();
  }



  frame(){
    window.requestAnimationFrame(() => this.frame());

    if (this.#createStorms && Math.random() < 0.00002)
      this.storm = !this.storm;

    this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);

    for (let particle of this.particlesList)
      particle.draw(this.ctx, this.storm);

  }


  // Очищает класс при удалении элемента Канвас
  createObserver(){
    const observer = new MutationObserver(list => {
      for (let mutation of list){
        let isCanv = [...mutation.removedNodes].some(node => node === this.canv);

        if (!isCanv)
          continue;

        this.remove();
        return;
      }
    });

    observer.observe(document.body, {subtree: false, childList: true});
    this.#_observer = observer;
  }



  #resize() {
    this.canv.width  = window.innerWidth;
    this.canv.height = window.innerHeight;
  }



  remove(){
    this.canv.remove();
    this.frame = () => false;

    delete this.canv;
    delete this.ctx;

    this.#_observer.disconnect();
    window.removeEventListener("resize", this.#resizeHandle);
  }



  static styles = {
    pointerEvents: "none",
    background: "none", //rgba(0, 0, 144, 0.02)
    position: "fixed",
    zIndex: "5"
  }



  static particlesDefaultParams = {
    opacity: () => Math.random(),
    radius:  () => Math.random() * 3.8 + 0.5,
    speedX:  () => Math.random() * 22 - 11,
    speedY:  () => Math.random() * 8 + 7,
    x:       () => Math.random() * window.innerWidth,
    y:       () => Math.random() * window.innerHeight
  }



}



class Particle {
  constructor({ opacity = 1, radius = 7, x = 0, y = 0, speedX, speedY }){

    this.opacity = typeof opacity === "function" ? opacity() : opacity;

    this.radius  = typeof radius  === "function" ? radius()  : radius;
    this.x       = typeof x       === "function" ? x()       : x;
    this.y       = typeof y       === "function" ? y()       : y;
    this.speedX  = typeof speedX  === "function" ? speedX()  : speedX;
    this.speedY  = typeof speedY  === "function" ? speedY()  : speedY;
  }



  draw(ctx, storm = false){

    if (storm){
      this.x -= this.speedX + 11;
      this.y += this.speedY * 2.5;
      this.draw(ctx, false);
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > window.innerHeight){
      this.y = -50;
      this.x = Math.random() * window.innerWidth;
    }

    let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0,   `rgba(255, 255, 255, ${ this.opacity })`);
      gradient.addColorStop(0.8, `rgba(210, 236, 242, ${ this.opacity })`);
      gradient.addColorStop(1,   `rgba(237, 247, 249, ${ this.opacity })`);

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }



}
