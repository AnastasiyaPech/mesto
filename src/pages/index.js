import '../pages/index.css';
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import { initialCards, formsConfig } from "../scripts/utils/constants.js";
import Api from "../scripts/components/Api";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js"

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
const btnOpenAvatar = document.querySelector('.profile__image');
const avatarInputForm = document.querySelector('.popup__input_type_avatar');
const avatarPopupContainer = document.querySelector('.popup_avatar');

btnOpenProfile.addEventListener('click', openProfilePopup);
btnOpenPlace.addEventListener('click', openPlacePopup);
btnOpenAvatar.addEventListener('click', openAvatarPopup);

const profileFormValidator = new FormValidator(formsConfig, profilePopupContainer);
const placeFormValidator = new FormValidator(formsConfig, placePopupContainer);
const avatarFormValidator = new FormValidator(formsConfig, avatarPopupContainer);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const api = new Api();

const userInfo = new UserInfo({ userName: profileName, description: profileJob });
api.getToUserInfo()
    .then((data) => {
        userInfo.setUserInfo({ name: data.name, description: data.about, id: data._id });
    })

const popupImage = new PopupWithImage('.popup_picture');
popupImage.setEventListeners();

const popupPlace = new PopupWithForm('.popup_place', addCard);
popupPlace.setEventListeners();

const popupProfile = new PopupWithForm('.popup_edit-profile', submitEditProfileForm);
popupProfile.setEventListeners();

const popupConfirm = new PopupWithConfirm('.popup_actionCheck');
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_avatar', changeAvatarPopup);
popupAvatar.setEventListeners();

const cardsSection = new Section({
    items: api.getInitialCards(),
    renderer: (item) => {
        const cardElement = createCard(item);
        list.append(cardElement);
    },
},
    list,
);
cardsSection.renderItems();


function createCard(item) {
    const card = new Card(item.name, item.link, item.likes.length, item._id, cardTemplateSelector,
        (imgName, imgLink) => popupImage.open(imgName, imgLink),
        popupConfirm, deleteCardConfirmPopup
    );

    const cardElement = card.createCard();
    return cardElement;
}

function addCard(data) {
    const item = {
        name: data.place,
        link: data.link
    }
    return api.createItem(item)
        .then((res) => {
            const cardElement = createCard(res);
            cardsSection.addItem(cardElement);

        })
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

function openAvatarPopup() {
    avatarFormValidator.cleanErrors();
    placeFormValidator.blockSubBtn();
    popupAvatar.open();
}

//функция отправки введенных пользователем значений для профиля
function submitEditProfileForm(data) {
    const value = {
        name: data.firstname,
        about: data.proffesion
    }
    return api.changeUserInfo(value)
        .then((res) => {
            userInfo.setUserInfo({ name: res.name, description: res.about });
        })
}

//функция удаления карточки через попап
function deleteCardConfirmPopup(card) {
    api.deleteItem(card._cardId)
        .then(() => {
            //сделать чтобы карточка удалялась когда нет ошибок
            // что возр
            card.deleteCard();
        })
}

// функция работы с попапом-аватаром
function changeAvatarPopup(data) {
    const value = {
        avatar: data.link
    }
    return api.changeAvatarImage(value)
        .then((res) => {
            btnOpenAvatar.style.backgroundImage = "url(" + res.avatar + ")";
        })
}






