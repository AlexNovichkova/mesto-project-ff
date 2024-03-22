import ".././styles/index.css";
import { createCard } from "./card.js";
import { openPopup, closePopup, animateModal } from "./modal.js";
import { enableValidation, clearValidationErrors } from "./validation.js";
import {
  getInitialCards,
  updateUserInfo,
  createNewCard,
  updateAvatar,
  getInfo,
  deleteCard,
  likeCard,
  unlikeCard,
} from "./api.js";

const placesList = document.querySelector(".places__list");
const popapImgCard = document.querySelector(".popup_type_image");
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const profileImg = document.querySelector(".profile__image");
const popapChangeAvatar = document.querySelector(".popup_type_change-avatar");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditContainer = document.querySelector(".popup_type_edit");
const popupCardEdit = document.querySelector(".popup_type_new-card");
const popupsClose = document.querySelectorAll(".popup__close");
const cardEditButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formAvatarElement = popapChangeAvatar.querySelector(".popup__form");
const formCardElement = popupCardEdit.querySelector(".popup__form");
const formProfileElement = profileEditContainer.querySelector(".popup__form");
const popupsAll = document.querySelectorAll(".popup");
const popapImg = document.querySelector(".popup__image");
const popapDescription = document.querySelector(".popup__caption");

getInfo()
  .then((userData) => {
    // Обновляем информацию о пользователе на странице
    const userNameElement = document.querySelector(".profile__title");
    const userDescElement = document.querySelector(".profile__description");
    const userAvatarElement = document.querySelector(".profile__image");

    userNameElement.textContent = userData.name;
    userDescElement.textContent = userData.about;
    userAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch((err) => {
    console.error(err);
  });

animateModal(popupCardEdit);
animateModal(profileEditContainer);

profileImg.addEventListener("click", function () {
  const buttonChangeAvatar = formAvatarElement.querySelector(".button");
  clearValidationErrors(formAvatarElement, config);
  updateButtonState(buttonChangeAvatar, false);
  openPopup(popapChangeAvatar);
});

popupsClose.forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    const popup = closeButton.closest(".popup");
    closePopup(popup);
  });
});

profileEditButton.addEventListener("click", function () {
  const formProfileButton = formProfileElement.querySelector(".button");
  updateButtonState(formProfileButton, false);
  clearValidationErrors(formProfileElement, config);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profileEditContainer);
});

cardEditButton.addEventListener("click", function () {
  const addCardButton = formCardElement.querySelector(".button");
  clearValidationErrors(formCardElement, config);
  updateButtonState(addCardButton, false);
  openPopup(popupCardEdit);
});

popupsAll.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  const changeAvatarButton = formAvatarElement.querySelector(".button");
  updateButtonState(changeAvatarButton, true);
  const link = formAvatarElement.elements.link.value;
  profileImg.style.backgroundImage = `url(${link})`;
  updateAvatar(link)
    .then((data) => {
      console.log("Avatar updated successfully:", data);
      closePopup(popapChangeAvatar);
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    });
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const formProfileButton = formProfileElement.querySelector(".button");
  const personName = formProfileElement.elements.name.value;
  const description = formProfileElement.elements.description.value;
  profileTitle.textContent = personName;
  profileDescription.textContent = description;
  updateUserInfo(personName, description)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
    })
    .catch((error) => {
      console.error("Ошибка при обновлении информации о пользователе:", error);
    });
  updateButtonState(formProfileButton, true);
  closePopup(profileEditContainer);
}

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const addCardButton = formCardElement.querySelector(".button");
  updateButtonState(addCardButton, true);
  const placeName = document.querySelector('input[name="place-name"]').value;
  const link = formCardElement.elements.link.value;
  const cardData = {
    name: placeName,
    link: link,
  };

  createNewCard(cardData)
    .then((data) => {
      console.log(data);
      addCardToPage(data, true);
      formCardElement.reset();
      closePopup(popupCardEdit);
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateButtonState(buttonElement, isSaving) {
  if (isSaving) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = "Сохранить";
    buttonElement.disabled = false;
  }
}

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
  const deleteCardFunc = (cardElement) => {
    deleteCard(cardElement)
      .then(() => {
        closePopup(document.querySelector(".popup_type_delete"));
        cardElement.remove();
      })
      .catch((error) => console.error("Ошибка при удалении карточки:", error));
  };
  const unlikeCardFunc = (cardElement, data) => {
    unlikeCard(cardElement, data)
      .then((updatedCardData) => {
        const countLike = cardElement.querySelector(".count_like");
        countLike.textContent = updatedCardData.likes.length;
        data.likes = updatedCardData.likes;
      })
      .catch((error) => console.error("Ошибка при удалении лайка:", error));
  };
  const likeCardFunc = (cardElement, data) => {
    likeCard(cardElement, data)
      .then((updatedCardData) => {
        const countLike = cardElement.querySelector(".count_like");
        countLike.textContent = updatedCardData.likes.length;
        data.likes = updatedCardData.likes;
      })
      .catch((error) => console.error("Ошибка при постановке лайка:", error));
  };
  const cardElement = createCard(
    data,
    deleteCardFunc,
    likeCardFunc,
    unlikeCardFunc,
    clickCardImage,
    isMyCard
  );
  if (localStorage.getItem(`like-${data._id}`) === "true") {
    cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  }
  placesList.insertBefore(cardElement, placesList.firstChild);
}

getInitialCards()
  .then((cards) => {
    cards.reverse().forEach((cardData) => {
      addCardToPage(
        cardData,
        JSON.parse(localStorage.getItem("myCards") || "[]").includes(
          cardData._id
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(config);
