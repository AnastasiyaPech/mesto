let popupContainer;
let btnOpen;
let btnClose;
let formElement;
let nameInput;
let jobInput;
let profileNameInput;
let profileJobInput;


    popupContainer = document.querySelector('.popup');
    btnOpen = document.querySelector('.profile__button');
    btnClose = document.querySelector('.popup__button-exit');
    formElement = document.querySelector('.popup__form');
    nameInput = document.querySelector('.popup__form-input_type_firstname');
    jobInput = document.querySelector('.popup__form-input_type_proffesion');
    profileNameInput = document.querySelector('.profile__title');
    profileJobInput = document.querySelector('.profile__text');


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



