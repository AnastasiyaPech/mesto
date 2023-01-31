const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const template = document.querySelector('#list-template').content.querySelector('.list__description');
const list = document.querySelector('.list')


let profilePopupContainer = document.querySelector('.popup');
let btnOpen = document.querySelector('.profile__button');
let btnClose = document.querySelector('.popup__button-exit');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-input_type_firstname');
let jobInput = document.querySelector('.popup__form-input_type_proffesion');
let profileNameInput = document.querySelector('.profile__title');
let profileJobInput = document.querySelector('.profile__text');

let placePopupContainer = document.querySelector('.popup_place');
let btnOpenPlace = document.querySelector('.profile__add');
let btnClosePlace = document.querySelector('.popup__button-exit_place');
let placeInput = document.querySelector('.popup__form-input_type_placename');
let urlInput = document.querySelector('.popup__form-input_type_url');
let placeForm = document.querySelector('.popup__form_place');


btnOpen.addEventListener('click', openProfilePopup);
btnClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

btnOpenPlace.addEventListener('click', openPlacePopup);
btnClosePlace.addEventListener('click', (evt) => {
    closePopup(placePopupContainer);
});

initialCards
    .map(createCard)
    .forEach((card) => {
        list.append(card);
    });

placeForm.addEventListener('submit', (evt) => {                        //добавление пользователем карточки на страницу
    evt.preventDefault();

    let item = {
        name: placeInput.value,
        link: urlInput.value
    }

    let card = createCard(item);
    list.prepend(card);
    closePopup(placePopupContainer)
});

function createCard(item) {            //функция создания карточки
    let cardData = template.cloneNode(true);
    cardData.querySelector('.list__text').textContent = item.name;
    cardData.querySelector('.list__image').src = item.link;
    cardData.querySelector('.list__image').alt = 'природа';
    cardData.querySelector('.list__trash-button').addEventListener('click', () => {
        cardData.remove();
    });
    cardData.querySelector('.list__button').addEventListener('click', () => {
        cardData.querySelector('.list__button').classList.toggle('list__button_active');
    });
    return cardData;
}

function openProfilePopup() {          //функция работы с профилем
    nameInput.value = profileNameInput.textContent;
    jobInput.value = profileJobInput.textContent;
    openPopup(profilePopupContainer);
}

function openPlacePopup() {          //функция работы с добавлением места
    openPopup(placePopupContainer);
}



function openPopup(popupToOpen) {               //общая функция открытия поп-апа
    popupToOpen.classList.add('popup_opened');
}

function closePopup(popupToClose) {              //общая функция закрытия поп-апа                  
    popupToClose.classList.remove('popup_opened');
}



function handleFormSubmit(evt) {    //функция отправки введенных пользователем значений для профиля
    evt.preventDefault();
    profileNameInput.textContent = nameInput.value;
    profileJobInput.textContent = jobInput.value;
    closePopup(profilePopupContainer);
}




