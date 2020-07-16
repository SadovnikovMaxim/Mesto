export class CardList{
  constructor(item, container, callbackCard) {
    this.item = item;
    this.container = container;
    this.callbackCard = callbackCard;

  }
 
  addCard(name, link) {
    const instance = this.callbackCard(name, link);
    this.container.append(instance);
  }

  render() {
    this.item.forEach((initialCard) => {
      this.addCard(initialCard.name, initialCard.link);
    })
  }

}





