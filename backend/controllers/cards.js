const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request');
const ForbiddenError = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found');
const { requestErrors } = require('../utils/error-messages');

// eslint-disable-next-line no-unused-vars
module.exports.getCards = (_req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === requestErrors.validation.ERROR_NAME) {
        const error = new BadRequestError(err.message.replace(/^.+: /g, ''));
        next(error);
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new NotFoundError(requestErrors.notFound.CARD_MESSAGE);
      }
      /** @description Запретить удалять чужие карточки */
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(requestErrors.forbidden.CARD_MESSAGE);
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send(deletedCard));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(requestErrors.notFound.CARD_MESSAGE);
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(requestErrors.notFound.CARD_MESSAGE);
      }
      res.send(card);
    })
    .catch(next);
};
