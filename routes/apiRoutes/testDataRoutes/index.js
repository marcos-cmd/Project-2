const router = require('express').Router();

const {
  findAllTestsApi,
  deleteTestByIdApi,
  insertTestApi,
  findTestByIdApi,
  findTestsByLoggedInUserApi,
} = require('../../../controllers/testDataController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');

router.use(authMiddleware);

// /api/testData/usertests
router.route('/usertests')
  .get(findTestsByLoggedInUserApi);

// /api/testData
router.route('/')
  .get(findAllTestsApi)
  .post(insertTestApi);


//  /api/testData/:testId
router.route('/:testId')
  .get(findTestByIdApi)
  .delete(deleteTestByIdApi);

module.exports = router;
