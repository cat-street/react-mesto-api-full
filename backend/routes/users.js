const router = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  login
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.post('/login', login);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
