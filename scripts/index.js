const TemplateCard = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function deleteCard(event) {
  const eventTarget = event.target;
  const listItem = eventTarget.closest(".places__item");
  listItem.remove();
}

function createCard(card, func) {
  const cardElement = TemplateCard.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  placesList.append(cardElement);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", func);
  return cardElement;
}

initialCards.forEach((card) => createCard(card, deleteCard));
