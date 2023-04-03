import '../pages/index.css';
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import { initialCards, formsConfig } from "../scripts/utils/constants.js"

const list = document.querySelector('.list');
const profilePopupContainer = document.querySelector('.popup_edit-profile');
const btnOpenProfile = document.querySelector('.profile__button');
const formProfile = document.querySelector('.popup__form_profile');
const nameInputForm = document.querySelector('.popup__input_type_firstname');
const jobInputForm = document.querySelector('.popup__input_type_proffesion');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__text');

const placePopupContainer = document.querySelector('.popup_place');
const btnOpenPlace = document.querySelector('.profile__add');
const placeInput = document.querySelector('.popup__input_type_placename');
const urlInput = document.querySelector('.popup__input_type_url');
const formPlace = document.querySelector('.popup__form_place');
const subBtnPlace = document.querySelector('.popup__button-save_place');

const picturePopupContainer = document.querySelector('.popup_picture');
const cardPicture = document.querySelector('.popup__image');
const titlePicture = document.querySelector('.popup__picture-text');
const cardTemplateSelector = document.querySelector('#list-template');

btnOpenProfile.addEventListener('click', openProfilePopup);
btnOpenPlace.addEventListener('click', openPlacePopup);

const profileFormValidator = new FormValidator(formsConfig, profilePopupContainer);
const placeFormValidator = new FormValidator(formsConfig, placePopupContainer);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

const userInfo = new UserInfo({ userName: profileName, description: profileJob });

const popupImage = new PopupWithImage(picturePopupContainer);
popupImage.setEventListeners();

const popupPlace = new PopupWithForm(placePopupContainer, addCard);
popupPlace.setEventListeners();

const popupProfile = new PopupWithForm(profilePopupContainer, submitEditProfileForm);
popupProfile.setEventListeners();

const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
        list.append(cardElement);
    },
},
    list,
);
cardsSection.renderItems();

function createCard(item) {
    const card = new Card(item.name, item.link, cardTemplateSelector, (imgName, imgLink) => popupImage.open(imgName, imgLink));
    const cardElement = card.createCard();
    return cardElement;
}

function addCard(data) {
    const item = {
        name: data['place'],
        link: data['link']
    };
    const cardElement = createCard(item);
    cardsSection.addItem(cardElement);
}


//функция работы с профилем
function openProfilePopup() {
    profileFormValidator.cleanErrors();
    const info = userInfo.getUserInfo();
    nameInputForm.value = info.name;
    jobInputForm.value = info.description;
    popupProfile.open();
}

//функция работы с добавлением места
function openPlacePopup() {
    placeFormValidator.cleanErrors();
    placeFormValidator.blockSubBtn();
    popupPlace.open();
}

//функция отправки введенных пользователем значений для профиля
function submitEditProfileForm(data) {
    userInfo.setUserInfo({ name: data['firstname'], description: data['proffesion'] });
    popupProfile.close();
}







