const router = require('express')
  .Router();
const {
  getAllUsersApi,
  getUserByIdApi,
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

module.exports = router;
