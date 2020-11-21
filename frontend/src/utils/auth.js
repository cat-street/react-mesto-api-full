const BASE_URL = 'https://auth.nomoreparties.co';

async function auth({ password, email }, url) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  });
  if (res.ok) {
    return res.json();
  } else {
    const err = await res.json();
    throw new Error(
      `Ошибка на сервере: ${err.message || err.error} (${res.statusText} - ${
        res.status
      })`
    );
  }
}

async function checkUser(token, url) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    const err = await res.json();
    throw new Error(
      `Ошибка на сервере: ${err.message || err.error} (${res.statusText} - ${
        res.status
      })`
    );
  }
}

export { auth, checkUser };
