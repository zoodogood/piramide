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
    Alert.create("Мы думаем, в процессе выполнения алгоритма в прошлый раз, игра зависла.\nЕсли всё было впорядке, проигнорируйте это сообщение и спокойно нажмите \"Играть!\"\n\nВ обратном случае с вероятностью 99.9% это был бесконечный цикл.", "warning", "Страница остановилась?");
  }
}


const crashDefender = new Defender();
