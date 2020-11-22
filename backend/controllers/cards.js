const Card = require('../models/card');
const { requestErrors } = require('../utils/const');

// eslint-disable-next-line no-unused-vars
module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(requestErrors.serverError.ERROR_CODE)
      .send({ message: requestErrors.serverError.MESSAGE }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
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

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === requestErrors.notFound.ERROR_NAME) {
        return res
          .status(requestErrors.notFound.ERROR_CODE)
          .send({ message: requestErrors.notFound.CARD_MESSAGE });
      }
      return res.status(requestErrors.serverError.ERROR_CODE)
        .send({ message: requestErrors.serverError.MESSAGE });
    });
};

module.exports.likeCard = (req, res) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === requestErrors.notFound.ERROR_NAME) {
        return res
          .status(requestErrors.notFound.ERROR_CODE)
          .send({ message: requestErrors.notFound.CARD_MESSAGE });
      }
      return res.status(requestErrors.serverError.ERROR_CODE)
        .send({ message: requestErrors.serverError.MESSAGE });
    });
};

module.exports.dislikeCard = (req, res) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === requestErrors.notFound.ERROR_NAME) {
        return res
          .status(requestErrors.notFound.ERROR_CODE)
          .send({ message: requestErrors.notFound.CARD_MESSAGE });
      }
      return res.status(requestErrors.serverError.ERROR_CODE)
        .send({ message: requestErrors.serverError.MESSAGE });
    });
};
