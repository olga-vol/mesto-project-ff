export function openModal(dom) {
  dom.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscModal);
}

export function closeModal(dom) {
  dom.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscModal);
}

export function closeEscModal(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}
export function closeOnOverlay(evt, dom) {
  if (
    !evt.target.classList.contains("popup__content") &&
    evt.target.classList.contains("popup_is-opened")
  ) {
    closeModal(dom);
  }
}
