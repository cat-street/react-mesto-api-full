const mongoose = require('mongoose');
const { validator } = require('../utils/validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле \'Имя\' обязательно'],
    minlength: [2, 'Имя должно быть длиннее 1 символа'],
    maxlength: [30, 'Имя должно быть короче 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Поле \'О себе\' обязательно'],
    minlength: [2, '\'О себе\' должно быть длиннее 1 символа'],
    maxlength: [30, '\'О себе\' должно быть короче 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле \'Аватар\' обязательно'],
    validate: {
      validator,
      message: 'Недопустимый URL',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
