const enableValidation = (config) => {                     //обход всех форм и всех инпутов формы
    const formElement = Array.from(document.querySelectorAll(config.formSelector));

    formElement.forEach((form) => {
        const inputElements = Array.from(form.querySelectorAll(config.inputSelector));
        inputElements.forEach((input, index, inputs) => {
            input.addEventListener('input', (evt) => {
                showIsValid(config, form, input);
                toggleButtonState(form, config, inputs);
            });
        });
    });
}

enableValidation(formsConfig);

const showInputError = (config, form, input) => {                        // функция показывает ошибку
    const errorElement = form.querySelector(`.${input.name}` + config.errorSpanSuffix)
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);
}


const hideInputError = (config, form, input) => {                        // функция скрывает ошибку
    const errorElement = form.querySelector(`.${input.name}` + config.errorSpanSuffix)
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

const showIsValid = (config, form, input) => {       //функция проверяет валидность поля и показывает/скрывает ошибку
    if (!input.validity.valid) {
        showInputError(config, form, input);
    }
    else {
        hideInputError(config, form, input);
    }
}

const hasInvalidInput = (inputs) => {             //функция проверяет наличие невалидного поля
    return inputs.some((input) => {
        return !input.validity.valid;
    });
};

const toggleButtonState = (form, config, inputs) => {           //функция отключает/включает кнопку отправки формы
    const submitButtonElement = form.querySelector(config.submitButtonSelector);
    if (hasInvalidInput(inputs)) {
        blockSubBtn(submitButtonElement, formsConfig.inactiveButtonClass);
    } else {
        submitButtonElement.classList.remove(config.inactiveButtonClass);
        submitButtonElement.removeAttribute('disabled');
    }
}

function blockSubBtn(button, config) {                           //функция блокировки кнопки
    button.classList.add(config);
    button.setAttribute('disabled', 'disabled');
}








