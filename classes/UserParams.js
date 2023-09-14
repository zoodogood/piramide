class Params {

  static prefix = "userParams";

  getList() {
    let _default = this.constructor.defaultValues;
    let user = localDB.getItem(this.constructor.prefix);

    return Object.assign({ ..._default }, user);
  }

  static setValue(key, value, {forceSave} = {}) {
    localDB.setItem(`${ this.prefix }.${key}`, value, {
      forceSave
    });
  }

  static getValue(key){
    return localDB.getItem(`${ this.prefix }.${ key }`);
  }

  static defaultValues = {
    launchOnStart: true,
    multiSlab: false,
    activatePoligon: false,
    slabsSpeed: 5,
    background: "#36393f",

    colorizeFunc: [
      {
        func: "hsl(240, 30, 25 - (n % 5) * 5)",
        _weight: 1,
      },
      {
        func: "hsl( random(255), 100, 70)",
        _weight: 1,
      },
      {
        func: "hsl(random(50) + 190, Math.round(70 / size * n) + 30, 70)",
        _weight: 5,
      },
      {
        func: "hsl(random(50), 100, 70)",
        _weight: 15,
      },
      {
        func: "n % 2 ? '#c6e44e' : '#70d729'",
        _weight: 25,
      },
    ],

    removeLibrary: false,
    letItSnow: false,

    codeSyntax: "a11y-dark",
    clearedConsole: true,
    codeSize: 100,
    codeareaHeight: "26vh",

    menuThemeDark: false,
    menuButtonsColor: 120,

    strangeClick: false,
    disableCustomScroll: false,
    alternativeConsole: false,
    lang: "en",
  };
}

const userParams = new Params().getList();
