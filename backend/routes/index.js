const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const cardsRouter = require('./cards');
const userRouter = require('./users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().trim().email().required()
      .max(30),
    password: Joi.string().trim().required(),
    name: Joi.string().trim().min(2).max(30),
    about: Joi.string().trim().min(2).max(30),
    avatar: Joi.string().trim().uri(),
  }),
}), createUser);

router.get('/signout', logout);

router.use('/cards', auth, cardsRouter);
router.use('/users', auth, userRouter);

module.exports = router;
