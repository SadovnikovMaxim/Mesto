class Card {
  constructor(name, link, openImagePopup) {
  this.name = name;
  this.link = link;

  this.openImageCallback = openImagePopup;
  this.card = null;
  }

  create() {
    const markup = `
    <div class="place-card">
    <div class="place-card__image">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <button class="place-card__like-icon"></button>
    </div>
  </div>
    `;

    const element = document.createElement("div");
    this.card = element;
    this.card.insertAdjacentHTML("afterbegin", markup);
    this.card.querySelector('.place-card__name').textContent = this.name;
    this.card.querySelector('.place-card__image').style.backgroundImage = `url(${this.link}`;
    this.card.querySelector('.place-card__image').setAttribute('data-url', `${this.link}`);
    this.setEventListeners();

    return this.card;
  }
  
  getLink = () => {
    const popupImg = document.querySelector('.popup__image');
    popupImg.src = this.link;
  }

  openImage = () => {
    this.getLink();
    this.openImageCallback(this.link);
  }

  like(){
    this.classList.toggle('place-card__like-icon_liked');
  }

  remove(event){
    event.stopPropagation();
    this.card.remove();
    this.card = null;
  }

  setEventListeners(){
    this.card.querySelector('.place-card__image').addEventListener('click', this.openImage);
    this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this));
  }

}
