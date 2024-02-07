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
    localDB.setItem(this.paramName, true, {forceSave: true});
  }


  #launchEndHandler(){
    localDB.removeItem(this.paramName, {forceSave: true});
  }


  check(){
    let isCrash = localDB.hasItem(this.paramName);
    if (!isCrash)
      return true;

    gtag("event", "'what's happens?'");


    Alert.setDelayMultiplayer(2.5);
    Alert.create(i18n("crashDefender-crash-message"), "warning", i18n("crashDefender-crash-title"));
  }
}


const crashDefender = new Defender();
