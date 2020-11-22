exports.defaultValues = {
  NAME: 'Жак-Ив Кусто',
  ABOUT: 'Исследователь',
  AVATAR: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
};

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
  serverError: {
    ERROR_CODE: 500,
    MESSAGE: 'Произошла ошибка',
  },
  notFound: {
    ERROR_CODE: 404,
    ERROR_NAME: 'DocumentNotFoundError',
    USER_MESSAGE: 'Пользователь не найден',
    CARD_MESSAGE: 'Карточка не найдена',
  },
  validation: {
    ERROR_CODE: 400,
    ERROR_NAME: 'ValidationError',
  },
  conflict: {
    ERROR_CODE: 409,
    MONGO_ERROR_CODE: 11000,
    MESSAGE: 'Пользователь с данным e-mail уже зарегистрирован',
  },
};
