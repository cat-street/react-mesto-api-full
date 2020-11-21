const mongoose = require('mongoose');
const { urlValidator } = require('../utils/validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле \'Название\' обязательно!'],
    minlength: [2, 'Название должно быть длиннее 1 символа'],
    maxlength: [30, 'Название должно быть короче 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле \'Ссылка\' обязательно!'],
    validate: {
      validator: urlValidator,
      message: 'Недопустимый URL!',
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
