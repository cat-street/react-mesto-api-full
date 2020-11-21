const router = require('express').Router();
const cardsRouter = require('./cards');
const userRouter = require('./users');

router.use('/cards', cardsRouter);
router.use('/users', userRouter);

module.exports = router;
