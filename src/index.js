import "./index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const placesContainer = document.querySelector(".places__list");
const popUps = document.querySelectorAll(".popup");
const imageShowPopUp = document.querySelector(".popup_type_image");
const cardImage = imageShowPopUp.querySelector(".popup__image");
const cardCaption = imageShowPopUp.querySelector(".popup__caption");
const showImageCloseButton = imageShowPopUp.querySelector(".popup__close");
///////кнопка редактировать профиль
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopUp = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const popUpCloseButton = editProfilePopUp.querySelector(".popup__close");
// Выберите элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
///////кнопка добавления карточек
const addButton = document.querySelector(".profile__add-button");
const createCardPopUp = document.querySelector(".popup_type_new-card");
const createcCardCloseButton = createCardPopUp.querySelector(".popup__close");
const createCardForm = document.forms["new-place"];

export function showImg(event) {
  const imageSrc = event.target.src;
  const imageName = event.target.alt;
  cardImage.src = imageSrc;
  cardImage.alt = imageName;
  cardCaption.textContent = imageName;
  if (event.target.classList.contains("card__image")) {
    openModal(imageShowPopUp);
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(editProfilePopUp);
}

imageShowPopUp.addEventListener("click", function (evt) {
  if (
    !evt.target.classList.contains("popup__content") &&
    evt.target.classList.contains("popup_is-opened")
  ) {
    closeModal(imageShowPopUp);
  }
});

showImageCloseButton.addEventListener("click", function () {
  closeModal(imageShowPopUp);
});

popUps.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

initialCards.forEach((card) => {
  placesContainer.append(createCard(card, deleteCard, likeCard, showImg));
});

editProfileButton.addEventListener("click", function () {
  openModal(editProfilePopUp);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

editProfilePopUp.addEventListener("click", function (evt) {
  if (
    !evt.target.classList.contains("popup__content") &&
    evt.target.classList.contains("popup_is-opened")
  ) {
    closeModal(editProfilePopUp);
  }
});

///кнопка закрыть попап
popUpCloseButton.addEventListener("click", function () {
  closeModal(editProfilePopUp);
});

///сделать сабмит
editProfileForm.addEventListener("submit", handleFormSubmit);

addButton.addEventListener("click", function () {
  openModal(createCardPopUp);
});

createCardPopUp.addEventListener("click", function (evt) {
  if (
    !evt.target.classList.contains("popup__content") &&
    evt.target.classList.contains("popup_is-opened")
  ) {
    closeModal(createCardPopUp);
  }
});

createcCardCloseButton.addEventListener("click", function () {
  closeModal(createCardPopUp);
});

createCardForm.addEventListener("submit", function (evt) {
  const placeName = createCardForm.elements["place-name"];
  const link = createCardForm.elements["link"];
  const newCard = { name: placeName.value, link: link.value };
  evt.preventDefault();
  placesContainer.prepend(createCard(newCard, deleteCard, likeCard, showImg));
  closeModal(createCardPopUp);
  createCardForm.reset();
});
