export default class Api {
    constructor(options) {
        // тело конструктора
    }

    // получение всех карточек в виде массива
    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
            headers: {
                authorization: 'daaa7891-307a-4edb-9b82-7c5e6a95cac2'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })

    }
    // добавление новой карточки на страницу
    createItem(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
            headers: {
                authorization: 'daaa7891-307a-4edb-9b82-7c5e6a95cac2',
                "Content-Type": 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }
    // загрузка информации о ползователе с сервера
    getToUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-66/users/me', {
            headers: {
                authorization: 'daaa7891-307a-4edb-9b82-7c5e6a95cac2'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    // редактирование профиля пользователя
    changeUserInfo(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me ', {
            method: 'PATCH',
            body: JSON.stringify({
                name: data.name,
                about: data.about
            }),
            headers: {
                authorization: 'daaa7891-307a-4edb-9b82-7c5e6a95cac2',
                "Content-Type": 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }


}

// const api = new Api({
//     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
//     headers: {
//         authorization: 'daaa7891-307a-4edb-9b82-7c5e6a95cac2',
//         'Content-Type': 'application/json'
//     }
// }); 