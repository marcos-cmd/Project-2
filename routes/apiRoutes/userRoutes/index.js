const router = require('express').Router();
const userController = require('../../../controllers/userController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');
// Every route we declare inside of here already has
// /api/users prepended
router.use(authMiddleware);

router.route('/')
    .get(userController.findAllUsers);

router.route('/:userId')
    .get(userController.findUserById)
    .delete(userController.deleteUserById)
// .put(userController.updateUserById);

module.exports = router;
