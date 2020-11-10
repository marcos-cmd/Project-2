const router = require('express').Router();

const {
    findAllLocationsApi,
    deleteLocationByIdApi,
    insertLocationApi,
    findLocationByIdApi,
    findLocationsByLoggedInUserApi,
} = require('../../../controllers/locationsController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');

router.use(authMiddleware);

// /api/locations/userlocations
router.route('/userlocations')
    .get(findLocationsByLoggedInUserApi)

// /api/locations
router.route('/')
    .get(findAllLocationsApi)
    .post(insertLocationApi);


//  /api/locations/:locationId
router.route('/:locationId')
    .get(findLocationByIdApi)
    .delete(deleteLocationByIdApi);

module.exports = router;