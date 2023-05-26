import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._buttonSave = this._popup1.querySelector('.popup__button-save_confirm');
        this._popupForm = this._popup1.querySelector('.popup__form');
      
    }


    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
           
        });

    }

    
}