const TOKENNAME = 'token';

const setToken = (token) => {
  localStorage.setItem(TOKENNAME, token);
}

const getToken = () => {
  return localStorage.getItem(TOKENNAME);
}

const removeToken = () => {
  localStorage.removeItem(TOKENNAME);
}

export { setToken, getToken, removeToken };
