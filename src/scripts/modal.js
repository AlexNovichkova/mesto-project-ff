import { addCardToPage } from "./cards.js";
import {
  formProfileElement,
  profileTitle,
  profileDescription,
  profileEditContainer,
  popupCardEdit,
  formCardElement,
} from "./index.js";

function openModal(popup) {
  popup.classList.toggle("popup_is-opened", true);
}

function closeModal(popup) {
  popup.classList.toggle("popup_is-opened", false);
}

function modalAnimated(popup) {
  popup.classList.toggle("popup_is-animated", true);
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const saveProfileButton =
    profileEditContainer.querySelector(".popup__button");
  const name = formProfileElement.elements.name.value;
  const description = formProfileElement.elements.description.value;
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  saveProfileButton.addEventListener("click", function () {
    closeModal(profileEditContainer);
  });
}

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const saveProfileButton = popupCardEdit.querySelector(".popup__button");
  const placeName = document.querySelector('input[name="place-name"]').value;
  const link = formCardElement.elements.link.value;
  const cardData = {
    name: placeName,
    link: link,
  };

  addCardToPage(cardData);
  formCardElement.reset();

  saveProfileButton.addEventListener("click", function () {
    closeModal(popupCardEdit);
  });
}

export {
  openModal,
  closeModal,
  modalAnimated,
  handleFormProfileSubmit,
  handleFormCardSubmit,
};
