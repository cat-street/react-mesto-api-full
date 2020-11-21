/**
 * @class
 * @description Создает объект доступа к API
 * @param {object} parameters - объект с базовым URL и заголовками для API
 */
class Api {
  constructor(parameters) {
    this._baseUrl = parameters.baseUrl;
    this._headers = parameters.headers;
  }

  /**
   * @method
   * @private
   * @description Обработка ошибок статуса ответа сервера
   * @param {object} res Объект ответа сервера
   */
  // eslint-disable-next-line class-methods-use-this
  _serverErrorsHandler(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((statusError) => {
        throw new Error(
          // eslint-disable-next-line max-len
          `Ошибка на сервере: ${statusError.message} (${res.statusText} - ${res.status})`
        );
      });
    }
  }

  /**
   * @method
   * @private
   * @param {string} infoPath Дополнение к пути для разных запросов
   * @param {string} method
   * @param {string} body
   */
  _fetchHandler(infoPath, method, body = null) {
    return fetch(`${this._baseUrl}${infoPath}`, {
      method: method,
      headers: this._headers,
      body: body,
    }).then((res) => {
      return this._serverErrorsHandler(res);
    });
  }

  /**
   * @method
   * @public
   * @param {string} infoPath
   */
  getData(infoPath) {
    return this._fetchHandler(infoPath);
  }

  /**
   * @method
   * @public
   * @param {string} infoPath
   * @param {string} name
   * @param {string} about
   */
  setUserInfo(infoPath, { name, about }) {
    return this._fetchHandler(
      infoPath,
      'PATCH',
      JSON.stringify({
        name,
        about,
      })
    );
  }

  /**
   * @method
   * @public
   * @param {string} infoPath
   * @param {string} name
   * @param {string} link
   */
  uploadNewPicture(infoPath, { name, link }) {
    return this._fetchHandler(
      infoPath,
      'POST',
      JSON.stringify({
        name,
        link,
      })
    );
  }

  /**
   * @method
   * @public
   * @param {string} infoPath
   * @param {object} avatar URL аватара
   */
  uploadAvatar(infoPath, { avatar }) {
    return this._fetchHandler(
      infoPath,
      'PATCH',
      JSON.stringify({
        avatar,
      })
    );
  }

  /**
   * @method
   * @public
   * @param {string} infoPath
   */
  deleteData(infoPath) {
    return this._fetchHandler(infoPath, 'DELETE');
  }

  /**
   * @method
   * @public
   * @param {string} infoPath
   */
  putData(infoPath) {
    return this._fetchHandler(infoPath, 'PUT');
  }
}

/**
 * @constant
 * @description Базовый объект для работы с API
 * @type {object}
 * @param {string} baseUrl Базовый путь к серверу
 * @param {object} header Заголовки для запросов
 */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'fbaa6fd0-e7f0-4f9e-9a88-0f5ca2f1027e',
    'Content-Type': 'application/json',
  },
});

export default api;
