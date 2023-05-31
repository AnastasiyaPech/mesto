export default class Card {
    constructor(name, link, likes, cardId, ownerId, templateSelector, onClickFunction, deletePopup, deleteImageFunction, checkLikeFunction) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._onClickFunction = onClickFunction;
        this._deletePopup = deletePopup;
        this._deleteImageFunction = deleteImageFunction;
        this._countLikes = likes.length;
        this._likes = likes;
        this._cardId = cardId;
        this._ownerId = ownerId;
        this._checkLikeFunction = checkLikeFunction;

    }

    //метод создания карточки
    createCard(currentUserId) {
        this._cardElement = this._templateSelector.content.querySelector('.list__description').cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.list__image');
        this._likeButton = this._cardElement.querySelector('.list__button');
        this._binButton = this._cardElement.querySelector('.list__trash-button');
        this._countElement = this._cardElement.querySelector('.list__countLikes');
        this._currentUserId = currentUserId;
        this._cardElement.querySelector('.list__text').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._countElement.textContent = this._countLikes;
        this._setEventListeners();
        const firstLikeStatus = this.checkIsLike(currentUserId);
        if (firstLikeStatus !== undefined) {
            this._likeButton.classList.add('list__button_active');
        } else {
            this._likeButton.classList.remove('list__button_active');
        }
         this._checkTrashButton(currentUserId);

        return this._cardElement;
    }

    _setEventListeners() {
        this._binButton.addEventListener('click', () => {
            this._deletePopup.open(() => {
                this._deleteImageFunction(this);
            });
        })

        this._likeButton.addEventListener('click', () => {
            this._checkLikeFunction();
        });
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick();
        })
    };


    deleteCard() {
        this._cardElement.remove();
    }

    toggleLike(likes) {
        this._likeButton.classList.toggle('list__button_active');
        this._countElement.textContent = likes.length;
        this._likes = likes;
    }
    _handleImageClick() {
        this._onClickFunction(this._name, this._link);
    }


    checkIsLike(currentUserId) {
        const value = this._likes.find((user) => {
            return user._id === currentUserId;
        })
        return value;
    }

    _checkTrashButton(currentUserId) {
        if (this._ownerId !== currentUserId) {
            this._binButton.remove();
        }
    };


}