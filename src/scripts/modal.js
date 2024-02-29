import { closeByEscape } from "./index.js";

function openPopup(popup) {
  popup.classList.toggle("popup_is-opened", true);
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.toggle("popup_is-opened", false);
  document.removeEventListener("keydown", closeByEscape);
}

function modalAnimated(popup) {
  popup.classList.toggle("popup_is-animated", true);
}

export { openPopup, closePopup, modalAnimated };
