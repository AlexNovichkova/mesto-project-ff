import { animateModal } from "./modal.js";
import { placesList, popapImgCard } from "./index.js";

function createCard(data, deleteCard, likeCard, clickCardImage) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .cloneNode(true)
    .querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  animateModal(popapImgCard);
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", (evt) => {
    likeCard(evt);
  });

  cardImage.addEventListener("click", () => {
    clickCardImage(data);
  });

  return cardElement;
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, deleteCard, likeCard, placesList };
