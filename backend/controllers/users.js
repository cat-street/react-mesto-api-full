const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { requestErrors } = require('../utils/const');

// eslint-disable-next-line no-unused-vars
module.exports.getUsers = (_req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(requestErrors.serverError.ERROR_CODE)
      .send({ message: requestErrors.serverError.MESSAGE }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === requestErrors.notFound.ERROR_NAME) {
        return res
          .status(requestErrors.notFound.ERROR_CODE)
          .send({ message: requestErrors.notFound.USER_MESSAGE });
      }
      return res.status(requestErrors.serverError.ERROR_CODE)
        .send({ message: requestErrors.serverError.MESSAGE });
    });
};

module.exports.createUser = (req, res) => {
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
        return res
          .status(requestErrors.validation.ERROR_CODE)
          .send({ message: err.message });
      }
      /** @description ошибка MongoDB, дублирующаяся запись */
      if (err.code === requestErrors.conflict.MONGO_ERROR_CODE) {
        return res
          .status(requestErrors.conflict.ERROR_CODE)
          .send({ message: requestErrors.conflict.MESSAGE });
      }
      return res.status(requestErrors.serverError.ERROR_CODE)
        .send({ message: requestErrors.serverError.MESSAGE });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === requestErrors.validation.ERROR_NAME) {
        return res
          .status(requestErrors.validation.ERROR_CODE)
          .send({ message: err.message });
      }
      return res.status(requestErrors.serverError.ERROR_CODE)
        .send({ message: requestErrors.serverError.MESSAGE });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === requestErrors.validation.ERROR_NAME) {
        return res
          .status(requestErrors.validation.ERROR_CODE)
          .send({ message: err.message });
      }
      return res.status(requestErrors.serverError.ERROR_CODE)
        .send({ message: requestErrors.serverError.MESSAGE });
    });
};
