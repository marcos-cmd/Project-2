const insertTestQuery = 'INSERT INTO testData (testDate, testResult, userId) VALUES (?, ?, ?);';
const findAllTestsQuery = 'SELECT * FROM testData;';
const findTestByIdQuery = 'SELECT * FROM testData WHERE id = ?;';
const findTestsByUserQuery = 'SELECT * FROM testData WHERE userId = ?;';
const deleteTestByIdQuery = 'DELETE FROM testData WHERE id = ?;';


module.exports = {
  insertTestQuery,
  findAllTestsQuery,
  findTestByIdQuery,
  findTestsByUserQuery,
  deleteTestByIdQuery,
}
