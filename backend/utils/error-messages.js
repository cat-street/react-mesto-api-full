exports.validationErrors = {
  email: {
    REQUIRED: "Поле 'E-mail' обязательно",
    LONG: 'Email должен быть короче 30 символов',
    INVALID: 'Недопустимый E-mail',
  },
  password: {
    REQUIRED: "Поле 'Пароль' обязательно",
  },
  name: {
    SHORT: 'В имени должно быть как минимум 2 символа',
    LONG: 'Имя должно быть короче 30 символов',
  },
  about: {
    SHORT: "'О себе' должно быть длиннее 1 символа",
    LONG: "'О себе' должно быть короче 30 символов",
  },
  url: {
    REQUIRED: "Поле 'Ссылка' обязательно",
    INVALID: 'Недопустимый URL',
  },
  cardName: {
    REQUIRED: "Поле 'Название' обязательно!",
    SHORT: 'В названии должно быть как минимум 2 символа',
    LONG: 'Название должно быть короче 30 символов',
  },
};

exports.requestErrors = {
  notFound: {
    ERROR_NAME: 'DocumentNotFoundError',
    USER_MESSAGE: 'Пользователь не найден',
    CARD_MESSAGE: 'Карточка не найдена',
    URL_MESSAGE: 'Запрашиваемый ресурс не найден',
  },
  validation: {
    ERROR_NAME: 'ValidationError',
  },
  conflict: {
    MONGO_ERROR_CODE: 11000,
    MESSAGE: 'Пользователь с данным e-mail уже зарегистрирован',
  },
  forbidden: {
    CARD_MESSAGE: 'Нельзя удалять чужие карточки',
  },
};

exports.authErrors = {
  unauthorized: {
    LOGIN_MESSAGE: 'Неправильные e-mail или пароль',
    NOTOKEN_MESSAGE: 'Необходима авторизация',
  },
};
