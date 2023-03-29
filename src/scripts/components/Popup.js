export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', evt => this._handleEscClose(evt));
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', evt => this._handleEscClose(evt));
    }


    _handleEscClose(evt, name) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        const popup = evt.currentTarget;
        if (evt.target === evt.currentTarget) {
            this.close();
        }
        if (evt.target === popup.querySelector('.popup__button-exit')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', evt => this._handleOverlayClose(evt))
    }
}


