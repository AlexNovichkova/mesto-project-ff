import { animateModal, closePopup, openPopup } from "./modal.js";
import { placesList, popapImgCard } from "./index.js";
import {likeCard, unlikeCard, deleteCard} from "./api.js"

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item');

function createCard(data, deleteCard, likeCard, unlikeCard, clickCardImage, isMyCard) {
  if (!data.likes) {
    data.likes = []; // Устанавливаем пустой массив, если свойство `likes` отсутствует
  }
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content
    .cloneNode(true)
    .querySelector(".card");
  cardElement.dataset.id = data._id;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const countLike = cardElement.querySelector(".count_like");
  countLike.textContent = data.likes.length
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  animateModal(popapImgCard);

  if (isMyCard) { 
    deleteButton.style.display = "block"; 
    deleteButton.addEventListener("click", function () { 
      openPopup(document.querySelector('.popup_type_delete'));
      document.querySelector('.confirm_delete__button').addEventListener("click", function () { 
        deleteCard(cardElement);
      })
     }); 
     localStorage.setItem('myCards', JSON.stringify([...JSON.parse(localStorage.getItem('myCards') || '[]'), data._id]));
  } else { 
    deleteButton.style.display = "none"; 
  }

  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      unlikeCard(cardElement, data);
    } else {
      likeCard(cardElement, data);
    }
  });

  cardImage.addEventListener("click", () => {
    clickCardImage(data);
  });

  return cardElement;
}



   




export { createCard, placesList };
