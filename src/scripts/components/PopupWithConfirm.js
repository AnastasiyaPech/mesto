import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup1.querySelector('.popup__form');
      
    }

// open -> write to this._currentCard 
// submit -> read from this._currentCard
// close popup -> clear this._currentCard (*)
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
           
        });

    }

    
}