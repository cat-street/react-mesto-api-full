const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');
const { authErrors } = require('../utils/error-messages');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, _res, next) => {
  const token = req.cookies.jwt;

  if (!token) throw new UnauthorizedError(authErrors.unauthorized.NOTOKEN_MESSAGE);

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'the-secret-key',
    );
  } catch (err) {
    throw new UnauthorizedError(authErrors.unauthorized.NOTOKEN_MESSAGE);
  }

  req.user = payload;

  next();
};
