export default class Card {
    constructor(name, link, onClickFunction) {
        this._name = name;
        this._link = link;
        this._cardElement = document.querySelector('#list-template').content.querySelector('.list__description').cloneNode(true);
        this._onClickFunction = onClickFunction;
        
    }
   //метод создания карточки
    createCard() {
        const cardImage = this._cardElement.querySelector('.list__image');
        this._cardElement.querySelector('.list__text').textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._cardElement.querySelector('.list__trash-button').addEventListener('click', () => {
            this._cardElement.remove();
        });
        this._cardElement.querySelector('.list__button').addEventListener('click', () => {
            this._cardElement.querySelector('.list__button').classList.toggle('list__button_active');
        });

        cardImage.addEventListener('click', () => {
            this._onClickFunction(this._name, this._link);
        })

        return this._cardElement;
    }

}