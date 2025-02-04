import "./index.css";
import { initialCards } from "./components/cards.js";
import {
  createCard,
  deleteCard,
  likeCard,
  showImg,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
const placesContainer = document.querySelector(".places__list");
const PopUps = document.querySelectorAll(".popup");

PopUps.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

initialCards.forEach((card) => {
  placesContainer.append(createCard(card, deleteCard, likeCard, showImg));
});

///////кнопка редактировать профиль
const EditProfileButton = document.querySelector(".profile__edit-button");
const EditProfilePopUp = document.querySelector(".popup");
const EditProfileForm = document.forms["edit-profile"];
const nameInput = EditProfileForm.elements.name;
const jobInput = EditProfileForm.elements.description;
const PopUpCloseButton = document.querySelector(".popup__close");

function handleFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  let NameValue = nameInput.value;
  let JobValue = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const ProfileTitle = document.querySelector(".profile__title");
  const ProfileDescription = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  ProfileTitle.textContent = NameValue;
  ProfileDescription.textContent = JobValue;
  NameValue = ProfileTitle.textContent;
  JobValue = ProfileDescription.textContent;
  closeModal(EditProfilePopUp);
}

EditProfileButton.addEventListener("click", function () {
  openModal(EditProfilePopUp);
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closeModal(EditProfilePopUp);
    }
  });
  document.addEventListener("click", function (evt) {
    if (
      !evt.target.classList.contains("popup__content") &&
      evt.target.classList.contains("popup_is-opened")
    ) {
      closeModal(EditProfilePopUp);
    }
  });
});
///кнопка закрыть попап
PopUpCloseButton.addEventListener("click", function () {
  closeModal(EditProfilePopUp);
});

///сделать сабмит
EditProfileForm.addEventListener("submit", handleFormSubmit);

///////кнопка добавления карточек
const addButton = document.querySelector(".profile__add-button");
const CreatecardPopUp = document.querySelector(".popup_type_new-card");
const CreatecCardCloseButton = CreatecardPopUp.querySelector(".popup__close");
const CreateCardForm = document.forms["new-place"];

addButton.addEventListener("click", function () {
  openModal(CreatecardPopUp);
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closeModal(CreatecardPopUp);
    }
  });
  document.addEventListener("click", function (evt) {
    if (
      !evt.target.classList.contains("popup__content") &&
      evt.target.classList.contains("popup_is-opened")
    ) {
      closeModal(CreatecardPopUp);
    }
  });
});
CreatecCardCloseButton.addEventListener("click", function () {
  closeModal(CreatecardPopUp);
});

CreateCardForm.addEventListener("submit", function (evt) {
  const PlaceName = CreateCardForm.elements["place-name"];
  const Link = CreateCardForm.elements["link"];
  const Newcard = { name: PlaceName.value, link: Link.value };
  evt.preventDefault();
  placesContainer.prepend(createCard(Newcard, deleteCard, likeCard, showImg));
  closeModal(CreatecardPopUp);
  PlaceName.value = "";
  Link.value = "";
});
