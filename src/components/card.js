const templateCard = document.querySelector("#card-template").content;

export function deleteCard(event) {
  const eventTarget = event.target;
  const listItem = eventTarget.closest(".places__item");
  listItem.remove();
}

export function likeCard(event) {
  if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_is-active");
  }
}

export function createCard(card, deleteCard, likeCard, showImg) {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
  cardElement.addEventListener("click", likeCard);
  cardElement.addEventListener("click", showImg);
  return cardElement;
}
