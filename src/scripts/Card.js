export default class Card {
    constructor(name, link, templateSelector, onClickFunction) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._onClickFunction = onClickFunction;

    }
    //метод создания карточки
    createCard() {
        const cardElement = this._templateSelector.content.querySelector('.list__description').cloneNode(true);
        const cardImage = cardElement.querySelector('.list__image');
        this._likeButton = cardElement.querySelector('.list__button');
        cardElement.querySelector('.list__text').textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._setEventListeners(cardElement, cardImage);

        return cardElement;
    }


    _setEventListeners(cardElement, cardImage) {
        cardElement.querySelector('.list__trash-button').addEventListener('click', () => {
            this._deleteCard(cardElement);
        });
        this._likeButton.addEventListener('click', () => {
            this._toggleLike(cardElement);
        });
        cardImage.addEventListener('click', () => {
            this._handleImageClick();
        })
    };


    _deleteCard(cardElement) {
        cardElement.remove();
    }
    _toggleLike() {
        this._likeButton.classList.toggle('list__button_active');
    }
    _handleImageClick(){
        this._onClickFunction(this._name, this._link);
    }
      
}