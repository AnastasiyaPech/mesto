import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popup1.querySelector('.popup__form');
      
    }

    open(onConfirmFunction) {
        super.open()
        this._onConfirmFunction = onConfirmFunction;
    }

// open -> write to this._currentCard 
// submit -> read from this._currentCard
// close popup -> clear this._currentCard (*)
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // this._handleFormSubmit();
            this._onConfirmFunction();
            this.close();
        });

    }
    // setUpOnConfirm(onConfirmFunction){
    //     this._onConfirmFunction = onConfirmFunction;
    // }

    // onConfirm() {
    //     this._onConfirmFunction();
    // } 

    
}