const router = require('express').Router();
const userRoutes = require('./userRoutes');
const testDataRoutes = require('./testDataRoutes');
const locationsRoutes = require('./locationsRoutes');
// Setup your routes for /api/something here
// This line of code makes it so that /api/fweets is prepended to fweetRoutes
// example route.use('/myRoute', myRoutes);

router.use('/users', userRoutes);
router.use('/testData', testDataRoutes);
router.use('/locations', locationsRoutes);

module.exports = router;
