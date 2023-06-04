import '../pages/index.css';
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import { initialCards, formsConfig } from "../scripts/utils/constants.js";
import api from "../scripts/components/Api.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js"

const list = document.querySelector('.list');
const profilePopupContainer = document.querySelector('.popup_edit-profile');
const btnOpenProfile = document.querySelector('.profile__button');
const nameInputForm = document.querySelector('.popup__input_type_firstname');
const jobInputForm = document.querySelector('.popup__input_type_proffesion');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__text');
const placePopupContainer = document.querySelector('.popup_place');
const btnOpenPlace = document.querySelector('.profile__add');
const cardTemplateSelector = document.querySelector('#list-template');
const btnOpenAvatar = document.querySelector('.profile__image');
const avatarPopupContainer = document.querySelector('.popup_avatar');
const btnAvatar = document.querySelector('.profile__image');

btnOpenProfile.addEventListener('click', openProfilePopup);
btnOpenPlace.addEventListener('click', openPlacePopup);
btnOpenAvatar.addEventListener('click', openAvatarPopup);

const profileFormValidator = new FormValidator(formsConfig, profilePopupContainer);
const placeFormValidator = new FormValidator(formsConfig, placePopupContainer);
const avatarFormValidator = new FormValidator(formsConfig, avatarPopupContainer);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({ userName: profileName, description: profileJob, avatar: btnAvatar});

//запрос данных пользователя и получения карточек
Promise.all([api.getToUserInfo(), api.getInitialCards()])
    .then(([data, cards]) => {
        userInfo.setUserInfo({ name: data.name, description: data.about, avatar: data.avatar, id: data._id });
        cardsSection.renderItems(cards);
    })
    .catch(err => {
        console.log(err);
    });

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

const cardsSection = new Section(
    (item) => { return createCard(item) },
    list,
);

function createCard(item) {
    const card = new Card(item.name, item.link, item.likes, item._id, item.owner._id, cardTemplateSelector,
        (imgName, imgLink) => popupImage.open(imgName, imgLink),
        popupConfirm, deleteCardConfirmPopup,
        () => {
            const likeStatus = card.checkIsLike(userInfo._id);
            if (likeStatus !== undefined) {
                api.deleteLike(card.cardId)
                    .then((res) => {
                        card.toggleLike(res.likes);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            else {
                api.putLike(card.cardId)
                    .then((res) => {
                        card.toggleLike(res.likes);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
    );

    const cardElement = card.createCard(userInfo._id);
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
        .catch((err) => {
            console.log(err);
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
    avatarFormValidator.blockSubBtn();
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
            userInfo.setUserInfo({ name: res.name, description: res.about, avatar: res.avatar, id: res._id });
        })
        .catch((err) => {
            console.log(err);
        })
}

//функция удаления карточки через попап
function deleteCardConfirmPopup(card) {
    return api.deleteItem(card.cardId)
        .then(() => {
            card.deleteCard();
        })
        .catch((err) => {
            console.log(err);
        })
}

// функция работы с попапом-аватаром
function changeAvatarPopup(data) {
    const value = {
        avatar: data.link
    }
    return api.changeAvatarImage(value)
        .then((res) => {
         userInfo.setUserInfo({ name: res.name, description: res.about, avatar: res.avatar, id: res._id});
        })
        .catch((err) => {
            console.log(err);
        
        })
}


