const router = require('express').Router();
const userRoutes = require('./userRoutes');
const testDataRoutes = require('./testDataRoutes');
const locationsRoutes = require('./locationsRoutes');

router.use('/users', userRoutes);
router.use('/testData', testDataRoutes);
router.use('/locations', locationsRoutes);

module.exports = router;
