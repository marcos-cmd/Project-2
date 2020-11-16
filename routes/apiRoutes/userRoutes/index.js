const router = require('express')
  .Router();
const {
  getAllUsersApi,
  getUserByIdApi,
  getUserByUsernameApi,
  deleteUserByIdApi,
} = require('../../../controllers/userController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');

router.use(authMiddleware);

// /api/users
router.route('/')
  .get(getAllUsersApi);

// /api/users/:userId  
router.route('/:userId')
  .get(getUserByIdApi)
  .delete(deleteUserByIdApi);
router.route('/user/:username')
  .get(getUserByUsernameApi)
module.exports = router;
