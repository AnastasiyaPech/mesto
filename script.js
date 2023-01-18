let popupContainer;
let btnOpen; 
let btnClose;

window.onload = function () {
    popupContainer = document.querySelector(".popup");
    btnOpen = document.querySelector(".profile__button");
    btnClose = document.querySelector(".popup__button-exit");

    btnOpen.addEventListener("click", openPopup);
    btnClose.addEventListener("click", closePopup);
}

function openPopup() {
    popupContainer.classList.add("popup_opened");
}

function closePopup() {
    popupContainer.classList.remove("popup_opened");
}