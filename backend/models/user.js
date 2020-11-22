const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { emailValidator, urlValidator } = require('../utils/validator');
const { defaultValues, validationErrors } = require('../utils/const');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, validationErrors.email.REQUIRED],
    maxlength: [30, validationErrors.email.LONG],
    unique: true,
    validate: {
      validator: emailValidator,
      message: validationErrors.email.INVALID,
    },
  },
  password: {
    type: String,
    required: [true, validationErrors.password.REQUIRED],
  },
  name: {
    type: String,
    minlength: [2, validationErrors.name.SHORT],
    maxlength: [30, validationErrors.name.LONG],
    default: defaultValues.NAME,
  },
  about: {
    type: String,
    minlength: [2, validationErrors.about.SHORT],
    maxlength: [30, validationErrors.about.LONG],
    default: defaultValues.ABOUT,
  },
  avatar: {
    type: String,
    default: defaultValues.AVATAR,
    validate: {
      validator: urlValidator,
      message: validationErrors.url.INVALID,
    },
  },
});

userSchema.statics.findUser = async function find(email, password) {
  const user = await this.findOne({ email }).orFail();
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error();
  return user;
};

module.exports = mongoose.model('user', userSchema);
