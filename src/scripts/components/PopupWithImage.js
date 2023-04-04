import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup1.querySelector('.popup__image');
        this._title = this._popup1.querySelector('.popup__picture-text');
    }

    open(name, link) {
        this._image.src = link;
        this._title.textContent = name;
        this._image.alt = name;
        super.open();
    }
}
