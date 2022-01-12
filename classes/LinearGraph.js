const
  MAX_WIDTH = 80,
  MIN_WIDTH = 20;

class LinearGraph {
  #setDotTitle

  init({container, dots: dotsResolve}){
    this.container = container;
    container.innerHTML = "";

    if (dotsResolve.length < 2)
      return container.innerHTML = `<center>Выиграйте ещё ${ ending(2 - dotsResolve.length, "раз", "", "", "а") } с разными алгоритмами,<br>чтобы увидеть статистику.</center>`;

    let maxX = 0, minX = Infinity, maxY = 0, minY = Infinity;
    for (let {x, y} of dotsResolve){
        if (x > maxX)
          maxX = x;

        if (y > maxY)
          maxY = y;

        if (x < minX)
          minX = x;

        if (y < minY)
          minY = y;
    }

    if (maxX - minX === 0)
      minX = maxX / 2;

    if (maxY - minY === 0)
      minY = maxY / 2;


    let widthK  = (MAX_WIDTH - MIN_WIDTH) / (maxX - minX);
    let heightK = (MAX_WIDTH - MIN_WIDTH) / (maxY - minY);
    let dots = dotsResolve.map(({x, y}) => this.createDot(  { x: MIN_WIDTH + widthK * (x - minX), y: MIN_WIDTH + heightK * (y - minY) },  { x, y }  ));

    this.createLines(dots);
    this.addSide({ from: minY, to: maxY, setView: (value) => `<span>${ value } шагов</span>` }, {title: "Количество шагов,\nза которые вы одержали победу"});
    this.addSide({ from: minX, to: maxX, setView: (value) => `<span>${ displayDate({ ms: value, weeks: false }) }</span>`}, {title: "Хронология данных"});

    return this;
  }


  createLines(dots){
    let lines = dots.slice(1).map((dot, i) => `<line x1="${ dots[i].x }%" y1="${ dots[i].y }%" x2="${ dot.x }%" y2="${ dot.y }%"/>` );
    this.container.insertAdjacentHTML( "afterbegin", this.constructor.SVGBase.replace("{lines}", lines) );
  }


  createDot(position, data){
    let dot = new Dot(position);

    if (this.#setDotTitle)
      dot.setTitle( this.#setDotTitle(data) );

    dot.slick(this);
    return dot;
  }


  addSide({from, to, setView}, {title, count = 3} = {}){
    let element = document.createElement("aside");
    element.classList.add("side");

    if (title)
      element.title = title;

    let content = [ ...new Array(count) ]
      .map((e, i, arr) => Math.round((to - from) * (i + 1) / arr.length  + from ))
      .map(setView)
      .join("<hr>");

    element.innerHTML = content;

    this.container.append(element);
  }


  setDisplayDots(callback){
    this.#setDotTitle = callback;
  }

  static SVGBase = `
    <svg viewBox="0 0 100 100" class = "linearGraph-svg" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      {lines}

    </svg>
  `
}


class Dot {
  constructor({x = 50, y = 50} = {}){
    let element = document.createElement("div");
    this.element = element;

    this.x = x;
    this.y = y;

    element.classList.add("linearGraph-dot");
    element.style.left = `${x - 0.75}%`;
    element.style.top  = `${y - 0.75}%`;
  }

  setTitle(title){
    this.element.title = title;
  }


  slick(linearGraph){
    linearGraph.container.append(this.element);
  }
}
