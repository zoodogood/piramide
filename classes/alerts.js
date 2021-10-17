class AlertBubble {
  constructor (hideIn){
    this.field = this.createField();

    this.limit = window.innerWidth > 950 ? 4 : 2;
    this.hideIn = hideIn;
  }


  async create(description, type = "success", title = false, {deletable: deletable, id: id} = {}){
    let timeoutDelay = this.timeout - Date.now();
    if (timeoutDelay > 0){
      await delay(timeoutDelay);
      return this.create(description, type, id);
    }
    this.timeout = Date.now() + 350;

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

    [...this.field.children].slice(0, -this.limit).filter(e => e.deletable !== false).forEach(e => this.remove(e));
    await delay(this.hideIn);
    this.remove(alert);
  }

  async remove(element){
    element.classList.add("removed");
    await delay(1350);
    element.remove();
  }

  createField(){
    let field = document.createElement("div");
    field.classList.add("field", "alertField");
    document.body.append(field);
    return field;
  }
}


const Alert = new AlertBubble( 15000 );
