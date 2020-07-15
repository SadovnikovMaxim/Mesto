export class Popup{

  constructor (container) {
  this.container = container;

  this.open = this.open.bind(this);
  this.close = this.close.bind(this);
  }

  close() {
    this.container.classList.remove('popup_is-opened')
  }

  open() {
    this.container.classList.toggle('popup_is-opened')
  }

}




