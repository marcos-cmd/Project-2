const insertLocationQuery = 'INSERT INTO locations (name, address, latitude, longitude, userId) VALUES (?, ?, ?, ?, ?);';
const findAllLocationsQuery = 'SELECT * FROM locations;';
const findLocationByIdQuery = 'SELECT * FROM locations WHERE id = ?;';
const findLocationsByUserQuery = 'SELECT * FROM locations WHERE userId = ?;';
const deleteLocationByIdQuery = 'DELETE FROM locations WHERE id = ?;';


module.exports = {
    insertLocationQuery,
    findAllLocationsQuery,
    findLocationByIdQuery,
    findLocationsByUserQuery,
    deleteLocationByIdQuery,
}