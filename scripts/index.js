const templateCard = document.querySelector("#card-template").content;
const placesContainer = document.querySelector(".places__list");

function deleteCard(event) {
  const eventTarget = event.target;
  const listItem = eventTarget.closest(".places__item");
  listItem.remove();
}

function createCard(card, deleteCard) {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  return cardElement;
}

initialCards.forEach((card) => {
  placesContainer.append(createCard(card, deleteCard));
});
