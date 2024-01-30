// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');

function createCard(data) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true).querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    
    deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
    });

    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove(); 
}

function addCardToPage(cardData) {
    const cardElement = createCard(cardData);
    placesList.appendChild(cardElement);
}

initialCards.forEach(addCardToPage);

  
