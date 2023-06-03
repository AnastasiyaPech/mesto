import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
      
    }

    open(onConfirmFunction) {
        super.open()
        this._onConfirmFunction = onConfirmFunction;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._onConfirmFunction();
        });

    }
  
}