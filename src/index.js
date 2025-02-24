import "./index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal, closeOnOverlay } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInfo,
  getInitialCards,
  updateInfo,
  postNewCard,
  updateAvatar,
} from "./components/api.js";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
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

let myId;

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-32",
  headers: {
    authorization: "178ed554-084f-4e65-8b16-6b2ef34ddbc6",
    "Content-Type": "application/json",
  },
};
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

export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

Promise.all([getInitialCards(), getInfo()])
  .then((data) => {
    const initialCards = Array.from(data[0]);
    myId = data[1]._id;
    profileTitle.textContent = data[1].name;
    profileDescription.textContent = data[1].about;
    profilePhoto.style.backgroundImage = `url(${data[1].avatar})`;
    initialCards.forEach((card) => {
      placesContainer.append(
        createCard(card, deleteCard, likeCard, showImg, myId)
      );
    });
  })
  .catch((err) => console.log(err));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, submitButtonEdit);
  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  updateInfo(nameValue, jobValue)
    .then(() => {
      // Вставьте новые значения с помощью textContent
      profileTitle.textContent = nameValue;
      profileDescription.textContent = jobValue;
      closeModal(editProfilePopUp);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitButtonEdit));
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
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

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
  renderLoading(true, submitButtonNewCard);
  evt.preventDefault();
  postNewCard(placeName.value, link.value)
    .then((res) => {
      placesContainer.prepend(
        createCard(res, deleteCard, likeCard, showImg, myId)
      );
      closeModal(createCardPopUp);
      createCardForm.reset();
      clearValidation(createCardForm, settings);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitButtonNewCard));
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
  updateAvatar(avatarUrl)
    .then(() => {
      profilePhoto.style.backgroundImage = `url(${avatarUrl})`;
      closeModal(avatarPopUp);
      editAvatarForm.reset();
      clearValidation(editAvatarForm, settings);
    })
    .catch((res) => console.log(res))
    .finally(() => renderLoading(false, submitButtonAvatar));
});

enableValidation(settings);
