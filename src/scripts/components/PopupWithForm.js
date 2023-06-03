import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._subBtnSave = this._popupForm.querySelector('.popup__button-save');
        this._usualBtnText = this._subBtnSave.textContent;

    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._subBtnSave.textContent = "Сохранение..."
            this._handleFormSubmit(this._getInputValues())
                .then(() => {
                    this.close();
                })
                .finally(() => {
                    this._subBtnSave.textContent = this._usualBtnText;  
                  }); 
        });

    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}