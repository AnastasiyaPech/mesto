export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._submitButtonElement = form.querySelector(config.submitButtonSelector);
        this._inputElements = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    }

    enableValidation() {
        this._inputElements.forEach((input, index, inputs) => {
            this._setEventListener(input, inputs);
        });
    }

    _setEventListener(input, inputs){
        input.addEventListener('input', (evt) => {
            this._showIsValid(this._config, this._form, input);
            this._toggleButtonState(this._form, this._config, inputs);
        });
    }
    

    // метод показывает ошибку
    _showInputError(config, form, input) {
        const errorElement = form.querySelector(`.${input.name}` + config.errorSpanSuffix)
        input.classList.add(config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(config.errorClass);
    }

    // метод скрывает ошибку
    _hideInputError(config, form, input) {
        const errorElement = form.querySelector(`.${input.name}` + config.errorSpanSuffix)
        input.classList.remove(config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(config.errorClass);
    }

    //метод проверяет валидность поля и показывает/скрывает ошибку
    _showIsValid(config, form, input) {
        if (!input.validity.valid) {
            this._showInputError(config, form, input);
        }
        else {
            this._hideInputError(config, form, input);
        }
    }

    //метод проверяет наличие невалидного поля
    _hasInvalidInput(inputs) {
        return inputs.some((input) => {
            return !input.validity.valid;
        });
    };

    //метод отключает/включает кнопку отправки формы
    _toggleButtonState(form, config, inputs) {
        if (this._hasInvalidInput(inputs)) {
            this.blockSubBtn(this._submitButtonElement, config.inactiveButtonClass);
        } else {
            this._submitButtonElement.classList.remove(config.inactiveButtonClass);
            this._submitButtonElement.removeAttribute('disabled');
        }
    }

    //метод блокировки кнопки
    blockSubBtn() {
        this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
        this._submitButtonElement.setAttribute('disabled', 'disabled');
    }

    cleanErrors() {
        this._inputElements.forEach((input) =>{
            this._hideInputError(this._config, this._form, input);
           
        }
    
    )};

}