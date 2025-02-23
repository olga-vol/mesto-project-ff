export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export function showInputError(formElement, inputElement, errorMessage) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(inputElement.id);
  inputElement.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.errorClass);
}

export function hideInputError(formElement, inputElement) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent = "";
}

export function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

export function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

export function toggleButtonState(buttonElement, inputList) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

export function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(buttonElement, inputList);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(formElement, input);
      toggleButtonState(buttonElement, inputList);
    });
  });
}

export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    setEventListeners(form);
  });
}

export function clearValidation(profileForm, settings) {
  const buttonElement = profileForm.querySelector(
    settings.submitButtonSelector
  );
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.inactiveButtonClass);
  const inputList = Array.from(
    profileForm.querySelectorAll(settings.inputSelector)
  );
  inputList.forEach((input) => {
    hideInputError(profileForm, input);
  });
}
