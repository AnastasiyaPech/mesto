const enableValidation = (config) => {                     //обход всех форм и всех инпутов формы
    const formSelector = Array.from(document.querySelectorAll(config.formSelector));
    formSelector.forEach((form) => {
        Array.from(form.querySelectorAll(config.inputSelector))
            .forEach((input) => {
                input.addEventListener('input', (evt) => {
                    showIsValid(config, form, input)
                });
            });
    });

    // const submitButtonSelector = formSelector.flatMap((item) => {
    //     Array.from(item.querySelectorAll(config.submitButtonSelector))
    // });


    //elementField.addEventListener('focus','focUsHandler);
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

// const submitForm = (evt) => {                           //функция делает кнопку отправки активной
//     evt.preventDefault();
//     submitButtonSelector.setAttribute('disabled', 'disabled');

//     const formIsValid = inputSelector.every((item) => {                //разблокировка кнопки после проверки валидности полей
//         item.validity.valid;
//     });
//     if (!formIsValid) {
//         submitButtonSelector.setAttribute('disabled', 'disabled');
//     }
//     else {
//         submitButtonSelector.removeAttribute('disabled');
//     }
// }






