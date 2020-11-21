/**
 * @constant
 * @description фрагменты пути для работы с API
 * @param {string} me данные пользователя
 * @param {string} cards коллекция карточек
 * @param {string} likes путь для добавления/снятия лайка
 */
const apiPaths = {
  CARDS: '/cards',
  LIKES: '/cards/likes',
  ME: '/users/me',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
};

const tooltipErrorMessages = {
  SUCCESS: 'Вы успешно зарегистрировались!',
  FAILURE: `Что-то пошло не так! Попробуйте${'\u00A0'}ещё раз.`,
};

export { apiPaths, tooltipErrorMessages };
