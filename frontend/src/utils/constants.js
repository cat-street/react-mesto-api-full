/**
 * @constant
 * @description фрагменты пути для работы с API
 * @param {string} me данные пользователя
 * @param {string} cards коллекция карточек
 * @param {string} likes путь для добавления/снятия лайка
 */
const apiPaths = {
  BASE_URL: 'https://api.catlogic.students.nomoreparties.co',
  CARDS: '/cards',
  LIKES: '/likes',
  ME: '/users/me',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  SIGNOUT: '/signout',
};

const apiHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const tooltipErrorMessages = {
  SUCCESS: 'Вы успешно зарегистрировались!',
  FAILURE: `Что-то пошло не так! Попробуйте${'\u00A0'}ещё раз.`,
};

export { apiPaths, apiHeaders, tooltipErrorMessages };
