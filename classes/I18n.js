(() => {
if (!globalThis.i18nLanguages)
  throw new Error("locales not connected");
globalThis.i18nSelected = "en";

function i18n(key, ...replaces){
  replaces = [...replaces];

  let string = globalThis.i18nLanguages[ globalThis.i18nSelected ][key];
  if (string === undefined)
    return undefined;

  // for optimisation eval used if the string starts with MARK
  const MARK = "*";
  const isHasEval = string.at(0) === MARK;
  if (isHasEval)
    string = string.slice(1);


  const replacer = (all, content) => {
    return !isHasEval ?
      content :
      (new Function("replaces", `return ${ content }`))(replaces)
  }

  const value = string.replaceAll(/\$\{(.+?)\}/g, replacer);
  return value;
}

class I18nManager {
  static replaceAll(){
    const nodes = [
      ...document.querySelectorAll("[i18n]"),
      ...document.querySelectorAll("[i18n-childs] > *")
    ];


    for (let index = 0; index < nodes.length; index++)
      this.replaceNode(  nodes[ index ]  );


  }

  static replaceNode(node, ...replaces){
    const {getter, setter} = this.TARGET_METHODS[  node.getAttribute("i18n")  ];
    const raw = getter(node, ...replaces);
    const value = raw.replaceAll(/\{\{(.+?)\}\}/g, (all, content) => i18n(content, ...replaces));
    setter(node, value);
  }

  static TARGET_METHODS = {
    content: {
      getter: node => node.innerHTML,
      setter: (node, value) => node.innerHTML = value
    }
  };
};

globalThis.i18n = i18n;
globalThis.I18nManager = I18nManager;
})();
