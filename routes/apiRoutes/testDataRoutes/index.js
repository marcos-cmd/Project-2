const router = require('express').Router();
const testDataController = require('../../../controllers/testDataController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');
// Every route we declare inside of here already has
// /api/testData prepended
router.use(authMiddleware);

router.route('/')
  .post(testDataController.createTestData)
  .get(testDataController.findAllTestData);

router.route('/:testId')
  .get(testDataController.findTestDataById)
  .delete(testDataController.deleteTestDataById);

module.exports = router;
