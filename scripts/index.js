let popupContainer = document.querySelector('.popup');
let btnOpen = document.querySelector('.profile__button');
let btnClose = document.querySelector('.popup__button-exit');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-input_type_firstname');
let jobInput = document.querySelector('.popup__form-input_type_proffesion');
let profileNameInput = document.querySelector('.profile__title');
let profileJobInput = document.querySelector('.profile__text');


btnOpen.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

function openPopup() {
    popupContainer.classList.add('popup_opened');
    nameInput.value = profileNameInput.textContent;
    jobInput.value = profileJobInput.textContent;
}

function closePopup() {
    popupContainer.classList.remove('popup_opened');
}


function handleFormSubmit(evt) {
    evt.preventDefault();
    profileNameInput.textContent = nameInput.value;
    profileJobInput.textContent = jobInput.value;
    closePopup();
}



