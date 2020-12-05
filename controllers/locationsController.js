const db = require('../model');

module.exports = {
    createLocation: async (req, res) => {
        const { name, longitude, latitude } = req.body;
        try {
            const newLocation = await db.Location.create({
                name,
                latitude,
                longitude,
                user: req.user._id,
            });

            req.user.locations.push(newLocation._id);
            await req.user.save();

            res.json(newLocation);
        } catch (e) {
            console.log('Location controller', e);
            res.status(401).json(e);
        }
    },
    findAllLocations: async (req, res) => {
        try {
            const allLocations = await db.Location.find({});
            res.json(allLocations);
        } catch (e) {
            console.log(e);
            res.status(401).json(e);
        }

    },
    findLocationById: async (req, res) => {
        const { locationId } = req.params;
        try {
            const locationById = await db.Location.findById(locationId).exec();
            res.json(locationById);
        } catch (error) {
            console.log(e);
            res.status(401).json(e);
        }
    },
    deleteLocationById: async (req, res) => {
        const { locationId } = req.params;
        try {
            const locationById = await db.Location.findByIdAndDelete(locationId).exec();
            res.json(locationById);
        } catch (error) {
            console.log(e);
            res.status(401).json(e);
        }
    },

};
