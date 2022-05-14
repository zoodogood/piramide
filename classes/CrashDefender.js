class Defender {
  constructor(){
    this.paramName = "crashDefender-breakLaunch";
    this.#handlers();
  }


  #handlers(){
    window.events.on("launchCode",    this.#launchHandler.bind(this));
    window.events.on("launchCodeEnd", this.#launchEndHandler.bind(this));
  }


  #launchHandler(){
    localStorage.setItem(this.paramName, "true");
  }


  #launchEndHandler(){
    localStorage.removeItem(this.paramName);
  }


  check(){
    let isCrash = this.paramName in localStorage;
    if (!isCrash)
      return true;

    gtag("event", "'what's happens?'");


    Alert.create(i18n("crashDefender-crash-message"), "warning", i18n("crashDefender-crash-title"));
  }
}


const crashDefender = new Defender();
