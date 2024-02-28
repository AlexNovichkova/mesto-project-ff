const placesList = document.querySelector(".places__list");

function createCard(data, deleteCard) {
  const cardTemplate = document.querySelector("#card-template");
  const popapImgCard = document.querySelector(".popup_type_image");
  const popapImg = document.querySelector(".popup__image");
  const popapDescription = document.querySelector(".popup__caption");
  const popupCloseButton = popapImgCard.querySelector(".popup__close");
  const cardElement = cardTemplate.content.cloneNode(true).querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  popapImgCard.classList.toggle("popup_is-animated", true);
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener("click", function () {
    popapImgCard.classList.toggle("popup_is-opened", true);
    popapImgCard.classList.toggle("popup_is-animated", true);
    popapImg.src = data.link;
    popapDescription.textContent = data.name;
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function addCardToPage(cardData) {
  const cardElement = createCard(cardData, deleteCard);
  placesList.insertBefore(cardElement, placesList.firstChild);
}

export { createCard, deleteCard, addCardToPage };
