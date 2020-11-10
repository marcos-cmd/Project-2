const {
    insertLocationQuery,
    findAllLocationsQuery,
    findLocationByIdQuery,
    findLocationsByUserQuery,
    deleteLocationByIdQuery,
} = require('./locationsQueries');
const connection = require('../config/connection');


const findAllLocationsFromDb = async () => {
    try {
        const [result] = await connection.query(findAllLocationsQuery);
        return result;
    } catch (e) {
        throw new Error(e);
    }
};


const findLocationByIdFromDb = async (LocationId) => {
    try {
        const [result] = await connection.query(findLocationByIdQuery, LocationId);
        return result[0];
    } catch (e) {
        throw new Error(e);
    }
};

const findLocationsByUserFromDb = async (userId) => {
    try {
        const [result] = await connection.query(findLocationsByUserQuery, userId);
        return result;
    } catch (e) {
        throw new Error(e);
    }
};


const insertLocationToDb = async (name, address, latitude, longitude, userId) => {
    try {
        const [result] = await connection.query(insertLocationQuery, [name, address, latitude, longitude, userId]);
        return await findLocationByIdFromDb(result.insertId);
    } catch (e) {
        throw new Error(e);
    }
};


const deleteLocationByIdFromDb = async (LocationId) => {
    try {
        const deletedLocation = await findLocationByIdFromDb(LocationId);
        await connection.query(deleteLocationByIdQuery, LocationId);
        return deletedLocation;
    } catch (e) {
        throw new Error(e);
    }
};


module.exports = {
    findAllLocationsFromDb,
    findLocationByIdFromDb,
    findLocationsByUserFromDb,
    insertLocationToDb,
    deleteLocationByIdFromDb,
};