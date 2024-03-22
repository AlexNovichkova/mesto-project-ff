const config = {
  baseUrl: "https://mesto.nomoreparties.co./v1/wff-cohort-8",
  headers: {
    authorization: "87691625-13ec-4341-b0af-c66cd14a8b2e",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleResponse);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(handleResponse)
    .then((data) => {
      return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Сортировка карточек по дате создания в обратном порядке
    });
};

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(handleResponse);
};

export const createNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  }).then(handleResponse);
};

export function updateAvatar(newAvatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: newAvatarLink }),
  }).then(handleResponse);
}

export function likeCard(cardElement, data) {
  const likeButton = cardElement.querySelector(".card__like-button");
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.add("card__like-button_is-active");
    localStorage.setItem(`like-${data._id}`, true);
    return fetch(`${config.baseUrl}/cards/likes/${cardElement.dataset.id}`, {
      method: "PUT",
      headers: config.headers,
    }).then(handleResponse);
  }
}

export function unlikeCard(cardElement, data) {
  const likeButton = cardElement.querySelector(".card__like-button");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
    localStorage.setItem(`like-${data._id}`, false);
    return fetch(`${config.baseUrl}/cards/likes/${cardElement.dataset.id}`, {
      method: "DELETE",
      headers: config.headers,
    }).then(handleResponse);
  }
}

export function deleteCard(cardElement) {
  return fetch(`${config.baseUrl}/cards/${cardElement.dataset.id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}
