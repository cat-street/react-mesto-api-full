const router = require('express').Router();
const auth = require('../middlewares/auth');
const cardsRouter = require('./cards');
const userRouter = require('./users');

router.use('/cards', auth, cardsRouter);
router.use('/users', auth, userRouter);

module.exports = router;
