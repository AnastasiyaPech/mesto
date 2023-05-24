export default class Card {
    constructor(name, link, countLikes, templateSelector, onClickFunction) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._onClickFunction = onClickFunction;
        this._countLikes = countLikes;

    }
    //метод создания карточки
    createCard() {
        this._cardElement = this._templateSelector.content.querySelector('.list__description').cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.list__image');
        this._likeButton = this._cardElement.querySelector('.list__button');
        this._countElement = this._cardElement.querySelector('.list__countLikes');
        this._cardElement.querySelector('.list__text').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._countElement.textContent = this._countLikes;
        this._setEventListeners();

        return this._cardElement;
    }


    _setEventListeners() {
        this._cardElement.querySelector('.list__trash-button').addEventListener('click', () => {
            this._deleteCard(this._cardElement);
        });
        this._likeButton.addEventListener('click', () => {
            this._toggleLike(this._cardElement);
        });
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick();
        })
    };


    _deleteCard() {
        this._cardElement.remove();
    }
    _toggleLike() {
        this._likeButton.classList.toggle('list__button_active');
    }
    _handleImageClick(){
        this._onClickFunction(this._name, this._link);
    }
      
}