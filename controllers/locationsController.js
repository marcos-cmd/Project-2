const {
    findAllLocationsFromDb,
    findLocationByIdFromDb,
    findLocationsByUserFromDb,
    insertLocationToDb,
    deleteLocationByIdFromDb,
} = require('../model/locationsOrm');

module.exports = {
    findLocationsByLoggedInUserApi: async (req, res) => {
        try {
            const userLocations = await findLocationsByUserFromDb(req.user.id);
            return res.json(userLocations);
        } catch (e) {
            res.status(401).json(e);
        }
    },
    findLocationByIdApi: async (req, res) => {
        const { locationId } = req.params;
        try {
            const location = await findLocationByIdFromDb(locationId);
            if (!location) {
                return res.status(404).send('No location found with that id');
            }
            return res.json(location);
        } catch (e) {
            res.status(401).json(e);
        }
    },
    findAllLocationsApi: async (req, res) => {
        try {
            const locations = await findAllLocationsFromDb();
            return res.json(locations);
        } catch (e) {
            res.status(401).json(e);
        }
    },
    deleteLocationByIdApi: async (req, res) => {
        const { locationId } = req.params;
        try {
            const locationToDelete = await findLocationByIdFromDb(locationId);
            if (locationToDelete.userId !== req.user.id) {
                return res.status(401).send('You are unauthorized to delete this location');
            }
            const deletedLocation = await deleteLocationByIdFromDb(locationId);
            return res.json(deletedLocation);
        } catch (e) {
            res.status(401).json(e);
        }
    },
    insertLocationApi: async (req, res) => {
        //  req.user // logged in user
        //  req.body // coming from form
        //  req.params // coming from wildcards declared in routes
        const { name, address, latitude, longitude } = req.body;
        try {
            const createdLocation = await insertLocationToDb(name, address, latitude, longitude, req.user.id);
            res.json(createdLocation);
        } catch (e) {
            res.status(401).json(e);
        }
    },
}