import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = popup.querySelector('.popup__image');
        this._title = popup.querySelector('.popup__picture-text');
    }

    open(name, link) {
        this._image.src = link;
        this._title.textContent = name;
        this._image.alt = name;
        super.open();
    }
}

