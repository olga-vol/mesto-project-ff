export let myId;
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-32",
  headers: {
    authorization: "178ed554-084f-4e65-8b16-6b2ef34ddbc6",
    "Content-Type": "application/json",
  },
};

export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

export function getInfo(title, description, photo) {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      title.textContent = data.name;
      description.textContent = data.about;
      photo.style.backgroundImage = `url(${data.avatar})`;
      myId = data._id;
    })
    .catch((err) => console.log(err));
}

export function getInitialCards(
  placesContainer,
  createCard,
  deleteCard,
  likeCard,
  showImg
) {
  Promise.all(
    [`${config.baseUrl}/cards`, `${config.baseUrl}/users/me`].map((url) =>
      fetch(url, {
        headers: config.headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    )
  )
    .then((data) => {
      const initialCards = Array.from(data[0]);
      const myId = data[1]._id;
      initialCards.forEach((card) => {
        placesContainer.append(
          createCard(card, deleteCard, likeCard, showImg, myId)
        );
      });
    })
    .catch((err) => console.log(err));
}
export function updateInfo(name, about, submitButton) {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitButton));
}

export function postNewCard(name, link, submitButton) {
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, submitButton));
}

export function deleteCardFromServer(id) {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((res) => {
      console.log(res.status);
    });
}
export function putLike(id, element) {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      element.textContent = res.likes.length;
    })
    .catch((res) => {
      console.log(res.status);
    });
}
export function deleteLike(id, element) {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      element.textContent = res.likes.length;
      console.log(res.likes.length);
    })
    .catch((res) => {
      console.log(res.status);
    });
}

export function updateAvatar(url, submitButton) {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((res) => console.log(res))
    .finally(() => renderLoading(false, submitButton));
}
