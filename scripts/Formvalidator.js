export default class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

    enableValidation() {
        const inputElements = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        inputElements.forEach((input, index, inputs) => {
            input.addEventListener('input', (evt) => {
                this._showIsValid(this._config, this._form, input);
                this._toggleButtonState(this._form, this._config, inputs);
            });
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
        const submitButtonElement = form.querySelector(config.submitButtonSelector);
        if (this._hasInvalidInput(inputs)) {
            this._blockSubBtn(submitButtonElement, formsConfig.inactiveButtonClass);
        } else {
            submitButtonElement.classList.remove(config.inactiveButtonClass);
            submitButtonElement.removeAttribute('disabled');
        }
    }

    //метод блокировки кнопки
    _blockSubBtn(button, config) {
        button.classList.add(config);
        button.setAttribute('disabled', 'disabled');
    }

}