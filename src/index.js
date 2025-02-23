import "./index.css";
// import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal, closeOnOverlay } from "./components/modal.js";
import {
  enableValidation,
  settings,
  clearValidation,
} from "./components/validation.js";
import {
  getInfo,
  getInitialCards,
  updateInfo,
  postNewCard,
  myId,
  updateAvatar,
  renderLoading,
} from "./components/api.js";

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
const submitButtonEdit = editProfilePopUp.querySelector(".popup__button");
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const popUpCloseButtonEditProfile =
  editProfilePopUp.querySelector(".popup__close");
///изменение аватара
const avatarPopUp = document.querySelector(".popup_type_avatar");
const avatarCloseButton = avatarPopUp.querySelector(".popup__close");
const editAvatarForm = document.forms["edit-avatar"];
const submitButtonAvatar = editAvatarForm.querySelector(".popup__button");
// Выберите элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profilePhoto = document.querySelector(".profile__image");
///////кнопка добавления карточек
const addButton = document.querySelector(".profile__add-button");
const createCardPopUp = document.querySelector(".popup_type_new-card");
const createcCardCloseButton = createCardPopUp.querySelector(".popup__close");
const createCardForm = document.forms["new-place"];
const submitButtonNewCard = createCardForm.querySelector(".popup__button");

getInfo(profileTitle, profileDescription, profilePhoto);
getInitialCards(
  placesContainer,
  createCard,
  deleteCard,
  likeCard,
  showImg,
  myId
);
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
  renderLoading(true, submitButtonEdit);
  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(editProfilePopUp);
  updateInfo(nameValue, jobValue, submitButtonEdit);
}

imageShowPopUp.addEventListener("click", function (evt) {
  closeOnOverlay(evt, imageShowPopUp);
});

showImageCloseButton.addEventListener("click", function () {
  closeModal(imageShowPopUp);
});

popUps.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

editProfileButton.addEventListener("click", function () {
  clearValidation(editProfilePopUp, settings);
  openModal(editProfilePopUp);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

editProfilePopUp.addEventListener("click", function (evt) {
  closeOnOverlay(evt, editProfilePopUp);
});

///кнопка закрыть попап
popUpCloseButtonEditProfile.addEventListener("click", function () {
  closeModal(editProfilePopUp);
});

///сделать сабмит
editProfileForm.addEventListener("submit", handleFormSubmit);

addButton.addEventListener("click", function () {
  openModal(createCardPopUp);
});

createCardPopUp.addEventListener("click", function (evt) {
  closeOnOverlay(evt, createCardPopUp);
});

createcCardCloseButton.addEventListener("click", function () {
  closeModal(createCardPopUp);
});

createCardForm.addEventListener("submit", function (evt) {
  const placeName = createCardForm.elements["place-name"];
  const link = createCardForm.elements["link"];
  const newCard = { name: placeName.value, link: link.value };
  renderLoading(true, submitButtonNewCard);
  evt.preventDefault();
  placesContainer.prepend(
    createCard(newCard, deleteCard, likeCard, showImg, myId)
  );
  postNewCard(placeName.value, link.value, submitButtonNewCard);
  closeModal(createCardPopUp);
  createCardForm.reset();
  clearValidation(createCardForm, settings);
});

profilePhoto.addEventListener("click", function () {
  openModal(avatarPopUp);
});

avatarPopUp.addEventListener("click", function (evt) {
  closeOnOverlay(evt, avatarPopUp);
});

avatarCloseButton.addEventListener("click", function () {
  closeModal(avatarPopUp);
});

editAvatarForm.addEventListener("submit", function (evt) {
  renderLoading(true, submitButtonAvatar);
  const avatarUrl = editAvatarForm.elements["url"].value;
  evt.preventDefault();
  updateAvatar(avatarUrl, submitButtonAvatar);
  profilePhoto.style.backgroundImage = `url(${avatarUrl})`;
  closeModal(avatarPopUp);
  editAvatarForm.reset();
  clearValidation(editAvatarForm, settings);
});

enableValidation(settings);
