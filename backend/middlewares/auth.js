const jwt = require('jsonwebtoken');
const { authErrors } = require('../utils/const');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(authErrors.unauthorized.ERROR_CODE)
      .send({ message: authErrors.unauthorized.NOTOKEN_MESSAGE });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'the-secret-key',
    );
  } catch (err) {
    return res
      .status(authErrors.unauthorized.ERROR_CODE)
      .send({ message: authErrors.unauthorized.NOTOKEN_MESSAGE });
  }

  req.user = payload;

  next();
};
