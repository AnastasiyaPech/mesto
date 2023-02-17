const template = document.querySelector('#list-template').content.querySelector('.list__description');
const list = document.querySelector('.list')

const profilePopupContainer = document.querySelector('.popup_edit-profile');
const btnOpenProfile = document.querySelector('.profile__button');
const btnCloseProfile = document.querySelector('.popup__button-exit');
const formProfile = document.querySelector('.popup__form');
const nameInputForm = document.querySelector('.popup__form-input_type_firstname');
const jobInputForm = document.querySelector('.popup__form-input_type_proffesion');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__text');

const placePopupContainer = document.querySelector('.popup_place');
const btnOpenPlace = document.querySelector('.profile__add');
const btnClosePlace = document.querySelector('.popup__button-exit_place');
const placeInput = document.querySelector('.popup__form-input_type_placename');
const urlInput = document.querySelector('.popup__form-input_type_url');
const formPlace = document.querySelector('.popup__form_place');

const picturePopupContainer = document.querySelector('.popup_picture');
const cardPicture = document.querySelector('.popup__image');
const titlePicture = document.querySelector('.popup__picture-text');
const btnClosePicture = document.querySelector('.popup__button-exit_picture');

btnOpenProfile.addEventListener('click', openProfilePopup);
btnCloseProfile.addEventListener('click', (evt) => { closePopup(profilePopupContainer) });
formProfile.addEventListener('submit', submitEditProfileForm);

btnOpenPlace.addEventListener('click', openPlacePopup);
btnClosePlace.addEventListener('click', (evt) => {
    closePopup(placePopupContainer);
});

//

initialCards
    .map(createCard)
    .forEach((card) => {
        list.append(card);
    });

    formPlace.addEventListener('submit', (evt) => {                        //добавление пользователем карточки на страницу
    evt.preventDefault();

    const item = {
        name: placeInput.value,
        link: urlInput.value
    }

    const card = createCard(item);
    list.prepend(card);
    placeInput.value = '';
    urlInput.value = '';
    closePopup(placePopupContainer)
});

function createCard(item) {                                             //функция создания карточки
    const cardData = template.cloneNode(true);
    const cardImage = cardData.querySelector('.list__image');
    cardData.querySelector('.list__text').textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardData.querySelector('.list__trash-button').addEventListener('click', () => {
        cardData.remove();
    });
    cardData.querySelector('.list__button').addEventListener('click', () => {
        cardData.querySelector('.list__button').classList.toggle('list__button_active');
    });

    cardImage.addEventListener('click', () => {
        openPicturePopup(item.name, item.link);
    })

    return cardData;
}

function openPicturePopup(itemname, itemlink) {                 //функция работы с поп-апом картинкой 
    cardPicture.src = itemlink;
    titlePicture.textContent = itemname;
    cardPicture.alt = itemname;
    openPopup(picturePopupContainer);
}

btnClosePicture.addEventListener('click', (evt) => {
    closePopup(picturePopupContainer);
});

function openProfilePopup() {                                 //функция работы с профилем
    nameInputForm.value = profileName.textContent;
    jobInputForm.value = profileJob.textContent;
    openPopup(profilePopupContainer);
}

function openPlacePopup() {                                   //функция работы с добавлением места
    openPopup(placePopupContainer);
}

function openPopup(popupToOpen) {                            //общая функция открытия поп-апа
    popupToOpen.classList.add('popup_opened');
}

function closePopup(popupToClose) {                          //общая функция закрытия поп-апа                  
    popupToClose.classList.remove('popup_opened');
}

function submitEditProfileForm(evt) {                            //функция отправки введенных пользователем значений для профиля
    evt.preventDefault();
    profileName.textContent = nameInputForm.value;
    profileJob.textContent = jobInputForm.value;
    closePopup(profilePopupContainer);
}




