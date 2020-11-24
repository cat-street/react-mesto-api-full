const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { defaultValues } = require('../utils/constants');
const {
  getUsers,
  getMe,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30)
      .default(defaultValues.NAME),
    about: Joi.string().trim().min(2).max(30)
      .default(defaultValues.ABOUT),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().trim().uri()
      .default(defaultValues.AVATAR),
  }),
}), updateAvatar);

module.exports = router;
