import ".././styles/index.css"; // добавьте импорт главного файла стилей
import { addCardToPage } from "./cards.js";
import {
  openModal,
  closeModal,
  modalAnimated,
  handleFormProfileSubmit,
  handleFormCardSubmit,
} from "./modal.js";

const addIcon = new URL(".././images/add-icon.svg", import.meta.url);
const avatar = new URL(".././images/avatar.jpg", import.meta.url);
const card1 = new URL(".././images/card_1.jpg", import.meta.url);
const card2 = new URL(".././images/card_2.jpg", import.meta.url);
const card3 = new URL(".././images/card_3.jpg", import.meta.url);
const close_ = new URL(".././images/close.svg", import.meta.url);
const deleteIcon = new URL(".././images/delete-icon.svg", import.meta.url);
const editIcon = new URL(".././images/edit-icon.svg", import.meta.url);
const likeActive = new URL(".././images/like-active.svg", import.meta.url);
const likeInactive = new URL(".././images/like-inactive.svg", import.meta.url);
const logo = new URL(".././images/logo.svg", import.meta.url);

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: "Add Icon", link: addIcon },
  { name: "Avatar", link: avatar },
  { name: "Card 1", link: card1 },
  { name: "Card 2", link: card2 },
  { name: "Card 3", link: card3 },
  { name: "Close", link: close_ },
  { name: "Delete Icon", link: deleteIcon },
  { name: "Edit Icon", link: editIcon },
  { name: "Like Active", link: likeActive },
  { name: "Like Inactive", link: likeInactive },
  { name: "Logo", link: logo },
];

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileEditButton = document.querySelector(".profile__edit-button");
export const profileEditContainer = document.querySelector(".popup_type_edit");
export const popupCardEdit = document.querySelector(".popup_type_new-card");
const popupsClose = document.querySelectorAll(".popup__close");
const cardEditButton = document.querySelector(".profile__add-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const formCardElement = popupCardEdit.querySelector(".popup__form");
const saveChangeButtons = document.querySelectorAll(".popup__button");
const popups = document.querySelectorAll(".popup");

modalAnimated(popupCardEdit);
modalAnimated(profileEditContainer);
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

saveChangeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    popups.forEach(function (popup) {
      closeModal(popup);
    });
  });
});

popupsClose.forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    const popup = closeButton.closest(".popup");
    closeModal(popup);
  });
});

profileEditButton.addEventListener("click", function () {
  openModal(profileEditContainer);
});

cardEditButton.addEventListener("click", function () {
  openModal(popupCardEdit);
});

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    popups.forEach((popup) => {
      closeModal(popup);
    });
  }
});

export const formProfileElement = profileEditContainer.querySelector(".popup__form");

formProfileElement.addEventListener("submit", handleFormProfileSubmit);
formCardElement.addEventListener("submit", handleFormCardSubmit);

initialCards.forEach(addCardToPage);
