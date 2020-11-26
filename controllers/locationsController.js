// // const {
// //     findAllLocationsFromDb,
// //     findLocationByIdFromDb,
// //     findLocationsByUserFromDb,
// //     insertLocationToDb,
// //     deleteLocationByIdFromDb,
// // } = require('../model/locationsOrm');

// module.exports = {
//     findLocationsByLoggedInUserApi: async (req, res) => {
//         try {
//             const userLocations = await findLocationsByUserFromDb(req.user.id);
//             return res.json(userLocations);
//         } catch (e) {
//             res.status(401).json(e);
//         }
//     },
//     findLocationByIdApi: async (req, res) => {
//         const { locationId } = req.params;
//         try {
//             const location = await findLocationByIdFromDb(locationId);
//             if (!location) {
//                 return res.status(404).send('No location found with that id');
//             }
//             return res.json(location);
//         } catch (e) {
//             res.status(401).json(e);
//         }
//     },
//     findAllLocationsApi: async (req, res) => {
//         try {
//             const locations = await findAllLocationsFromDb();
//             return res.json(locations);
//         } catch (e) {
//             res.status(401).json(e);
//         }
//     },
//     deleteLocationByIdApi: async (req, res) => {
//         const { locationId } = req.params;
//         try {
//             const locationToDelete = await findLocationByIdFromDb(locationId);
//             if (locationToDelete.userId !== req.user.id) {
//                 return res.status(401).send('You are unauthorized to delete this location');
//             }
//             const deletedLocation = await deleteLocationByIdFromDb(locationId);
//             return res.json(deletedLocation);
//         } catch (e) {
//             res.status(401).json(e);
//         }
//     },
//     insertLocationApi: async (req, res) => {
//         console.log(req.user);
//         //  req.user // logged in user
//         //  req.body // coming from form
//         //  req.params // coming from wildcards declared in routes
//         const { name, latitude, longitude } = req.body;
//         try {
//             const createdLocation = await insertLocationToDb(name, latitude, longitude, req.user.id);
//             res.json(createdLocation);
//         } catch (e) {
//             console.log(e);
//             res.status(401).json(e);
//         }
//     },
// }

const db = require('../model');

module.exports = {
    createLocation: async (req, res) => {
        const { name, location } = req.body;
        try {
            const newLocation = await db.Location.create({
                name,
                location,
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
    // updateChameleonById: async (req, res) => {
    //   const { chamId } = req.params;
    //   const { name } = req.body;
    //   try {
    //     const chamById = await db.Chameleon.findByIdAndUpdate(chamId, {
    //       name
    //     }, { new: true })
    //     res.json(chamById);
    //   } catch (error) {
    //     console.log(e);
    //     res.status(401).json(e);
    //   }
    // },
};
