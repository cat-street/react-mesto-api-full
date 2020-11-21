const Card = require('../models/card');

// eslint-disable-next-line no-unused-vars
module.exports.getCards = (_req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: err.message });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      const ERROR_CODE = 404;
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Карточка не найдена' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
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
      const ERROR_CODE = 404;
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Карточка не найдена' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
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
      const ERROR_CODE = 404;
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Карточка не найдена' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
