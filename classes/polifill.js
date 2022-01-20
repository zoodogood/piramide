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



(() => {
  if ("at" in Array.prototype)
    return;

  function at(n) {
  	n = Math.trunc(n) || 0;

  	if (n < 0)
      n += this.length;

  	if (n < 0 || n >= this.length)
      return undefined;

  	return this[n];
  }

  const TypedArray = Reflect.getPrototypeOf(Int8Array);
  for (const Class of [Array, String, TypedArray]) {
      Object.defineProperty(Class.prototype, "at",
      {
        value: at,
        writable: true,
        enumerable: false,
        configurable: true
      });
  }
})();
