import { apiPaths, apiHeaders } from '../utils/constants';

/**
 * @class
 * @description Создает объект доступа к API
 * @param {object} parameters - объект с базовым URL и заголовками для API
 */
class Api {
  constructor(parameters) {
    this._baseUrl = parameters.baseUrl;
    this._headers = parameters.headers;
    this._credentials = parameters.credentials;
  }

  /**
   * @method
   * @private
   * @param {string} infoPath Дополнение к пути для разных запросов
   * @param {string} method
   * @param {string} body
   */
  async _fetchHandler(infoPath, method, body = null) {
    const res = await fetch(`${this._baseUrl}${infoPath}`, {
      method: method,
      headers: this._headers,
      body: body,
      credentials: this._credentials,
    });
    if (res.ok) {
      return res.json();
    }
    const statusError = await res.json();
    let message = statusError.message;
    if (statusError.validation) {
      message = statusError.validation.body.message;
    }
    throw new Error(message);
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

  auth(infoPath, { password, email }) {
    return this._fetchHandler(
      infoPath,
      'POST',
      JSON.stringify({
        password,
        email,
      })
    );
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
  baseUrl: apiPaths.BASE_URL,
  headers: apiHeaders,
  credentials: 'include',
});

export default api;
