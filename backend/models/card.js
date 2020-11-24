const mongoose = require('mongoose');
const { urlValidator } = require('../utils/validator');
const { validationErrors } = require('../utils/error-messages');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, validationErrors.cardName.REQUIRED],
    minlength: [2, validationErrors.cardName.SHORT],
    maxlength: [30, validationErrors.cardName.LONG],
  },
  link: {
    type: String,
    required: [true, validationErrors.url.REQUIRED],
    validate: {
      validator: urlValidator,
      message: validationErrors.url.INVALID,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
