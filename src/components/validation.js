function showInputError(formElement, inputElement, errorMessage, settings) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(inputElement.id);
  inputElement.classList.add(settings.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(settings.errorClass);
}
function hideInputError(formElement, inputElement, settings) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  formError.classList.remove(settings.errorClass);
  formError.textContent = "";
}

function isValid(formElement, inputElement, settings) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(buttonElement, inputList, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(buttonElement, inputList, settings);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(formElement, input, settings);
      toggleButtonState(buttonElement, inputList, settings);
    });
  });
}

export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, settings);
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
    hideInputError(profileForm, input, settings);
  });
}
