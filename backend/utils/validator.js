const validator = require('validator');

module.exports.urlValidator = (v) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*$)/.test(v);

module.exports.emailValidator = (v) => validator.default.isEmail(v);
