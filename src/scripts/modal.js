import { closeByEscape } from "./index.js";
import {clearValidationErrors} from "./validation.js"

function openPopup(popup) {
  popup.classList.toggle("popup_is-opened", true);
  document.addEventListener("keydown", closeByEscape);
  clearValidationErrors(popup.querySelector(".popup__form"))
}

function closePopup(popup) {
  popup.classList.toggle("popup_is-opened", false);
  document.removeEventListener("keydown", closeByEscape);
}

function animateModal(popup) {
  popup.classList.toggle("popup_is-animated", true);
}

export { openPopup, closePopup, animateModal };
