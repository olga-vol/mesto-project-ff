import { openModal } from "./modal.js";
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
export function showImg(event) {
  const imageSrc = event.target.src;
  const imageName = event.target.alt;
  const ImageShowPopUp = document.querySelector(".popup_type_image");
  const cardImage = ImageShowPopUp.querySelector(".popup__image");
  const cardCaption = ImageShowPopUp.querySelector(".popup__caption");
  const ShowImageCloseButton = ImageShowPopUp.querySelector(".popup__close");
  cardImage.src = imageSrc;
  cardImage.alt = imageName;
  cardCaption.textContent = imageName;
  if (event.target.classList.contains("card__image")) {
    openModal(ImageShowPopUp);
  }
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      ImageShowPopUp.classList.remove("popup_is-opened");
    }
  });
  ShowImageCloseButton.addEventListener("click", function () {
    ImageShowPopUp.classList.remove("popup_is-opened");
  });
}

export function createCard(card, deleteCard, likeCard, showImg) {
  const templateCard = document.querySelector("#card-template").content;
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
