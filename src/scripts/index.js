import ".././styles/index.css";
import { createCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup, animateModal } from "./modal.js";
import {enableValidation, clearValidationErrors} from "./validation.js";
import { getInitialCards, updateUserInfo, createNewCard, updateAvatar, getInfo, deleteCard, likeCard, unlikeCard } from './api.js';

getInfo();
const placesList = document.querySelector(".places__list");
const popapImgCard = document.querySelector(".popup_type_image");

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

const profileImg = document.querySelector('.profile__image');
const popapAvatar = document.querySelector('.popup_type_change-avatar');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditContainer = document.querySelector(".popup_type_edit");
const popupCardEdit = document.querySelector(".popup_type_new-card");
const popupsClose = document.querySelectorAll(".popup__close");
const cardEditButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formAvatarElement = popapAvatar.querySelector(".popup__form");
const formCardElement = popupCardEdit.querySelector(".popup__form");
const popups = document.querySelectorAll(".popup");
const popapImg = document.querySelector(".popup__image");
const popapDescription = document.querySelector(".popup__caption");

animateModal(popupCardEdit);
animateModal(profileEditContainer);
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

profileImg.addEventListener("click", function () {
  const changeAvatarButton = formAvatarElement.querySelector('.button');
  updateButtonState(changeAvatarButton, false);
  openPopup(popapAvatar);
});

popupsClose.forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    const popup = closeButton.closest(".popup");
    closePopup(popup);
  });
});

profileEditButton.addEventListener("click", function () {
  const formProfileButton = formProfileElement.querySelector('.button');
  updateButtonState(formProfileButton, false);
  clearValidationErrors(formProfileElement);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profileEditContainer);
});

cardEditButton.addEventListener("click", function () {
  const addCardButton = formCardElement.querySelector('.button');
  updateButtonState(addCardButton, false);
  openPopup(popupCardEdit);
  
});

popups.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  const changeAvatarButton = formAvatarElement.querySelector('.button');
  const link = formAvatarElement.elements.link.value;
  profileImg.style.backgroundImage = `url(${link})`;
  updateAvatar(link);
  updateButtonState(changeAvatarButton, true);
  closePopup(popapAvatar);
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const formProfileButton = formProfileElement.querySelector('.button');
  const Name = formProfileElement.elements.name.value;
  const description = formProfileElement.elements.description.value;
  profileTitle.textContent = Name;
  profileDescription.textContent = description;
  updateUserInfo(Name, description);
  updateButtonState(formProfileButton, true);
  closePopup(profileEditContainer);
}

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const addCardButton = formCardElement.querySelector('.button');
  updateButtonState(addCardButton, true);
  const placeName = document.querySelector('input[name="place-name"]').value;
  const link = formCardElement.elements.link.value;
  const cardData = {
    name: placeName,
    link: link,
  };

  createNewCard(cardData)
  .then((data) => {
    addCardToPage(data, true);
    formCardElement.reset();
    closePopup(popupCardEdit);
  })
  .catch(error => {
    console.error(error);
  });
}

function updateButtonState(buttonElement, isSaving) {
  if (isSaving) {
    buttonElement.textContent = 'Сохранение...';
    buttonElement.disabled = true;

  } else {
    buttonElement.textContent = 'Сохранить';
    buttonElement.disabled = false;

  }
}

const formProfileElement = profileEditContainer.querySelector(".popup__form");

formProfileElement.addEventListener("submit", handleFormProfileSubmit);
formCardElement.addEventListener("submit", handleFormCardSubmit);
formAvatarElement.addEventListener("submit", handleChangeAvatarSubmit);

function clickCardImage(data) {
  openPopup(popapImgCard);
  popapImg.src = data.link;
  popapImg.alt = data.name;
  popapDescription.textContent = data.name;
}

function addCardToPage(data, isMyCard) {
  const cardElement = createCard(
    data,
    deleteCard,
    likeCard,
    unlikeCard,
    clickCardImage,
    isMyCard
  );
  if (localStorage.getItem(`like-${data._id}`) === 'true') {
    cardElement.querySelector(".card__like-button").classList.add("card__like-button_is-active");
  }
  placesList.insertBefore(cardElement, placesList.firstChild);
}

getInitialCards()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
});



enableValidation();


export {
  addCardToPage,
  formProfileElement,
  formCardElement,
  profileDescription,
  profileTitle,
  popupCardEdit,
  profileEditContainer,
  closeByEscape,
  placesList,
  popapImgCard,
};
