import { closePopup } from "./modal.js";
import { addCardToPage, profileTitle, profileDescription} from "./index.js";

const config = {
baseUrl: 'https://mesto.nomoreparties.co./v1/wff-cohort-8',
headers: {
    authorization: '87691625-13ec-4341-b0af-c66cd14a8b2e',
    'Content-Type': 'application/json'
}
}

const token = '87691625-13ec-4341-b0af-c66cd14a8b2e';
const cohortId = 'wff-cohort-8';

export const getInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
    })
    .then((res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((userData) => {
    // Обновляем информацию о пользователе на странице
    const userNameElement = document.querySelector('.profile__title');
    const userDescElement = document.querySelector('.profile__description');
    const userAvatarElement = document.querySelector('.profile__image');

    userNameElement.textContent = userData.name;
    userDescElement.textContent = userData.about;
    userAvatarElement.style.backgroundImage = `url(${userData.avatar})`;
    })
    .catch((err) => {
    console.error(err);
    });
};


export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) => {
        // Обработка данных и добавление карточек на страницу
        data.forEach(cardData => {
          addCardToPage(cardData, JSON.parse(localStorage.getItem('myCards') || '[]').includes(cardData._id));
        });
      })
      .catch((err) => {
        console.log(err);
      });
};

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about })
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          return Promise.reject(`Ошибка: ${response.status}`);
      }
  })
  .then(userData => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
  })
  .catch(error => {
      console.error('Ошибка при обновлении информации о пользователе:', error);
  });
}

export const createNewCard = (cardData) => { 
  return fetch(`${config.baseUrl}/cards`, { 
      method: 'POST', 
      headers: config.headers, 
      body: JSON.stringify(cardData) 
  }) 
  .then(res => { 
      if (res.ok) { 
          return res.json(); 
      } 
      return Promise.reject(`Ошибка: ${res.status}`); 
  }) 
  .then(data => {
    console.log(data);
    return data;
  }) 
  .catch(error => { 
      console.error(error); 
  }); 
} 

export function updateAvatar(newAvatarLink) {
  fetch('https://mesto.nomoreparties.co./v1/wff-cohort-8/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: newAvatarLink }),
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  })
  .then(data => {
    console.log('Avatar updated successfully:', data);
  })
  .catch(error => {
    console.error('Error updating avatar:', error);
  });
}

export function likeCard(cardElement, data) {
  const countLike = cardElement.querySelector(".count_like");
  const likeButton = cardElement.querySelector(".card__like-button");

  if (!likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.add("card__like-button_is-active");
    localStorage.setItem(`like-${data._id}`, true);
    fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardElement.dataset.id}`, {
      method: 'PUT',
      headers: {
        authorization: '87691625-13ec-4341-b0af-c66cd14a8b2e',
      }
    })
    .then(response => response.json())
    .then(updatedCardData => {
      countLike.textContent = updatedCardData.likes.length;
      data.likes = updatedCardData.likes;
    })
    .catch(error => console.error('Ошибка при постановке лайка:', error));
  }
}

export function unlikeCard(cardElement, data) {
  const countLike = cardElement.querySelector(".count_like");
  const likeButton = cardElement.querySelector(".card__like-button");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
    localStorage.setItem(`like-${data._id}`, false);
    fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/likes/${cardElement.dataset.id}`, {
      method: 'DELETE',
      headers: {
        authorization: '87691625-13ec-4341-b0af-c66cd14a8b2e',
      }
    })
    .then(response => response.json())
    .then(updatedCardData => {
      countLike.textContent = updatedCardData.likes.length;
      data.likes = updatedCardData.likes; 
    })
    .catch(error => console.error('Ошибка при удалении лайка:', error));
  }
}

export function deleteCard(cardElement) {
    fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-8/cards/${cardElement.dataset.id}`, { 
      method: 'DELETE', 
      headers: {
        authorization: '87691625-13ec-4341-b0af-c66cd14a8b2e',
      }
    }) 
    .then(response => { 
      if (response.ok) { 
        cardElement.remove(); 
        closePopup(document.querySelector('.popup_type_delete'));
      } else { 
        console.error('Ошибка при удалении карточки:', response.status); }
       }) 
       .catch(error => console.error('Ошибка при удалении карточки:', error)); 
      
}