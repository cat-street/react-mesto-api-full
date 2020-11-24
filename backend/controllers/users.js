const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request');
const ConflictError = require('../errors/conflict');
const NotFoundError = require('../errors/not-found');
const { requestErrors } = require('../utils/error-messages');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line no-unused-vars
module.exports.getUsers = (_req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(requestErrors.notFound.USER_MESSAGE);
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(requestErrors.notFound.USER_MESSAGE);
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === requestErrors.validation.ERROR_NAME) {
        const error = new BadRequestError(err.message.replace(/^.+: /g, ''));
        next(error);
      }
      /** @description ошибка MongoDB, дублирующаяся запись */
      if (err.code === requestErrors.conflict.MONGO_ERROR_CODE) {
        const error = new ConflictError(requestErrors.conflict.MESSAGE);
        next(error);
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(requestErrors.notFound.USER_MESSAGE);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === requestErrors.validation.ERROR_NAME) {
        const error = new BadRequestError(err.message.replace(/^.+: /g, ''));
        next(error);
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(requestErrors.notFound.USER_MESSAGE);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === requestErrors.validation.ERROR_NAME) {
        const error = new BadRequestError(err.message.replace(/^.+: /g, ''));
        next(error);
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUser(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'the-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
        sameSite: true,
      })
        .send(user);
    })
    .catch(next);
};

module.exports.logout = (_req, res, next) => {
  try {
    res.cookie('jwt', '', {
      maxAge: -1,
      httpOnly: true,
      sameSite: true,
    })
      .send({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};
