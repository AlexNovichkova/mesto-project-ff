import ".././styles/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup, animateModal } from "./modal.js";

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

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditContainer = document.querySelector(".popup_type_edit");
const popupCardEdit = document.querySelector(".popup_type_new-card");
const popupsClose = document.querySelectorAll(".popup__close");
const cardEditButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formCardElement = popupCardEdit.querySelector(".popup__form");
const popups = document.querySelectorAll(".popup");
const popapImg = document.querySelector(".popup__image");
const popapDescription = document.querySelector(".popup__caption");

animateModal(popupCardEdit);
animateModal(profileEditContainer);
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

popupsClose.forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    const popup = closeButton.closest(".popup");
    closePopup(popup);
  });
});

profileEditButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profileEditContainer);
});

cardEditButton.addEventListener("click", function () {
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

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const name = formProfileElement.elements.name.value;
  const description = formProfileElement.elements.description.value;
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  closePopup(profileEditContainer);
}

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const placeName = document.querySelector('input[name="place-name"]').value;
  const link = formCardElement.elements.link.value;
  const cardData = {
    name: placeName,
    link: link,
  };
  addCardToPage(cardData);
  formCardElement.reset();
  closePopup(popupCardEdit);
}

const formProfileElement = profileEditContainer.querySelector(".popup__form");

formProfileElement.addEventListener("submit", handleFormProfileSubmit);
formCardElement.addEventListener("submit", handleFormCardSubmit);

function clickCardImage(data) {
  openPopup(popapImgCard);
  popapImg.src = data.link;
  popapImg.alt = data.name;
  popapDescription.textContent = data.name;
}

function addCardToPage(cardData) {
  const cardElement = createCard(
    cardData,
    deleteCard,
    likeCard,
    clickCardImage
  );
  placesList.insertBefore(cardElement, placesList.firstChild);
}

initialCards.forEach(addCardToPage);

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
