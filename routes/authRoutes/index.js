const router = require('express')
  .Router();

const {
  signIn,
  signUp,
} = require('../../controllers/authController');

// /auth prepended to everything
const signInMiddleware = require('../../middlewares/signInMiddleware');

// /auth/signin
router.post('/signin', signInMiddleware, signIn);
router.post('/signup', signUp);

module.exports = router;
