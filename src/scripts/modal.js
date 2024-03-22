function openPopup(popup) {
  popup.classList.toggle("popup_is-opened", true);
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.toggle("popup_is-opened", false);
  document.removeEventListener("keydown", closeByEscape);
}

function animateModal(popup) {
  popup.classList.toggle("popup_is-animated", true);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup, animateModal };
