(() => {
if (!globalThis.i18nLanguages)
  throw new Error("locales not connected");

let i18nSelected = "en";

function i18n(key, ...replaces){
  replaces = [...replaces];

  let string = globalThis.i18nLanguages[ i18nSelected ][key];

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
    const type = node.getAttribute("i18n") || node.parentNode.getAttribute("i18n-childs");

    const {getter, setter} = this.TARGET_METHODS[ type ];
    const raw = getter(node, ...replaces);
    const value = raw.replaceAll(/\{\{\s*(.+?)\s*\}\}/g, (all, content) => i18n(content, ...replaces));
    setter(node, value);
  }

  static TARGET_METHODS = {
    content: {
      getter: node => node.innerHTML,
      setter: (node, value) => node.innerHTML = value
    },
    attribute: {
      getter: node => node.getAttribute( node.getAttribute("data-i18-attribute-target") ),
      setter: (node, value) => node.setAttribute( node.getAttribute("data-i18-attribute-target"), value )
    }
  };

  static setLang(lang){
    i18nSelected = lang;
  }
};

globalThis.i18n = i18n;
globalThis.I18nManager = I18nManager;
})();


if (location.href.match(/lang=\w+/)){
  const value = location.href.match(/(?<=lang=)\w+/).at(0);
  Params.setValue("lang", value);
  userParams.lang = value;
}


I18nManager.setLang(userParams.lang);
