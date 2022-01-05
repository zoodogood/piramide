// Event.prototype.path
Object.defineProperty(Event.prototype, "path", {
  get: function(){
    let target = this.target;

    let elementsPath = [];
    while (target.parentNode !== null) {
      elementsPath.push(target);
      target = target.parentNode;
    }

    elementsPath.push(window.document, window);
    return elementsPath;
  }
});
