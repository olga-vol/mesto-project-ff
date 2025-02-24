import { deleteCardFromServer, deleteLike, putLike } from "./api.js";
const templateCard = document.querySelector("#card-template").content;

export function deleteCard(event, card) {
  const eventTarget = event.target;
  const listItem = eventTarget.closest(".places__item");
  console.log(card);
  if (card.hasOwnProperty("_id")) {
    deleteCardFromServer(card._id)
      .then(() => {
        listItem.remove();
      })
      .catch((res) => {
        console.log(res.status);
      });
  }
}

export function likeCard(event, card) {
  const eventTarget = event.target;
  const likeNumberElement = eventTarget
    .closest(".card__like")
    .querySelector(".card__like-p");
  if (event.target.classList.contains("card__like-button_is-active")) {
    deleteLike(card._id)
      .then((res) => {
        likeNumberElement.textContent = res.likes.length;
        if (event.target.classList.contains("card__like-button")) {
          event.target.classList.toggle("card__like-button_is-active");
        }
      })
      .catch((res) => {
        console.log(res.status);
      });
  } else {
    putLike(card._id)
      .then((res) => {
        likeNumberElement.textContent = res.likes.length;
        if (event.target.classList.contains("card__like-button")) {
          event.target.classList.toggle("card__like-button_is-active");
        }
      })
      .catch((res) => {
        console.log(res.status);
      });
  }
}

export function createCard(card, deleteCard, likeCard, showImg, myId) {
  const cardElement = templateCard.querySelector(".card").cloneNode(true);
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (event) => {
    deleteCard(event, card);
  });

  cardLikeButton.addEventListener("click", (event) => {
    likeCard(event, card);
  });

  cardElement.addEventListener("click", showImg);

  const likeNumber = cardElement.querySelector(".card__like-p");
  if (card.hasOwnProperty("likes")) {
    likeNumber.textContent = card.likes.length;
    const likeIdList = card.likes.map((like) => like._id);
    if (likeIdList.includes(myId)) {
      cardLikeButton.classList.add("card__like-button_is-active");
    }
  } else {
    likeNumber.textContent = 0;
  }
  if (card.hasOwnProperty("owner")) {
    if (card.owner._id !== myId) {
      deleteButton.classList.add("card__delete-button_hide");
    }
  }
  return cardElement;
}
