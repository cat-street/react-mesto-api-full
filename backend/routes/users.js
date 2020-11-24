const router = require('express').Router();
const {
  getUsers,
  getMe,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
