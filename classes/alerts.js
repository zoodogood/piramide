class AlertBubble {
  constructor ({ delayMultiplayer = 1 } = {}){
    this.field = this.createField();

    this.limit = window.innerWidth > 950 ? 4 : 2;
    this.delayMultiplayer = delayMultiplayer;
  }


  async create(description, type = "success", title = false, {deletable: deletable, id: id} = {}){
    let timeoutDelay = this.timeout - Date.now();
    if (timeoutDelay > 0){
      await delay(timeoutDelay);
      return this.create(description, type, title);
    }
    this.timeout = Date.now() + 350;

    await delay(700);

    const alert = document.createElement("div");
    alert.type = "normalAlert";

    if (deletable === false){
      alert.deletable = false;
      alert.classList.add("nonDeletableAlert");
    }

    alert.classList.add(type, "alert");
    title = title || {
      "success": "Успешно!",
      "warning": "Инфо",
      "error"  : "Ошибка:"
    }[type];

    const paragraf = document.createElement("p");
    paragraf.textContent = title;
    const span = document.createElement("span");
    span.innerHTML = description;

    alert.append(paragraf);
    alert.append(span);

    this.field.append(alert);

    [...this.field.children].slice(0, -this.limit)
      .filter(e => e.deletable !== false)
      .forEach(e => this.remove(e));

    this.field.onclick = this.remove.bind(this, alert);

    await delay(this.delayMultiplayer * description.length * 30);
    this.remove(alert);
  }

  async remove(element){
    await delay(100);

    element.classList.add("removed");
    await delay(350);
    element.remove();
  }

  createField(){
    let field = document.createElement("div");
    field.classList.add("field", "alertField");
    document.body.append(field);
    return field;
  }
}


const Alert = new AlertBubble({ delayMultiplayer: 1 });
