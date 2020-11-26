const router = require('express').Router();
const locationController = require('../../../controllers/locationsController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');
// Every route we declare inside of here already has
// /api/testData prepended
router.use(authMiddleware);

router.route('/')
    .post(locationController.createLocation)
    .get(locationController.findAllLocations);

router.route('/:locationId')
    .get(locationController.findLocationById)
    .delete(locationController.deleteLocationById)
//   .put(testDataController.updateChameleonById);

module.exports = router;
