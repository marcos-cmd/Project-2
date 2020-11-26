const {
  insertTestQuery,
  findAllTestsQuery,
  findTestByIdQuery,
  findTestsByUserQuery,
  deleteTestByIdQuery,
} = require('./testDataQueries');
const connection = require('../config/connection').promise();


const findAllTestsFromDb = async () => {
  try {
    const [result] = await connection.query(findAllTestsQuery);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};


const findTestByIdFromDb = async (TestId) => {
  try {
    const [result] = await connection.query(findTestByIdQuery, TestId);
    return result[0];
  } catch (e) {
    throw new Error(e);
  }
};

const findTestsByUserFromDb = async (userId) => {
  try {
    const [result] = await connection.query(findTestsByUserQuery, userId);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};


const insertTestToDb = async (testDate, testResult, userId) => {
  try {
    const [result] = await connection.query(insertTestQuery, [testDate, testResult, userId]);
    return await findTestByIdFromDb(result.insertId);
  } catch (e) {
    throw new Error(e);
  }
};


const deleteTestByIdFromDb = async (TestId) => {
  try {
    const deletedTest = await findTestByIdFromDb(TestId);
    await connection.query(deleteTestByIdQuery, TestId);
    return deletedTest;
  } catch (e) {
    throw new Error(e);
  }
};


module.exports = {
  findAllTestsFromDb,
  findTestByIdFromDb,
  findTestsByUserFromDb,
  insertTestToDb,
  deleteTestByIdFromDb,
};
