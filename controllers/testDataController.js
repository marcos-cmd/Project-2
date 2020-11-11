const {
  findAllTestsFromDb,
  findTestByIdFromDb,
  findTestsByUserFromDb,
  insertTestToDb,
  deleteTestByIdFromDb,
} = require('../model/testDataOrm');

module.exports = {
  findTestsByLoggedInUserApi: async (req, res) => {
    try {
      const userTests = await findTestsByUserFromDb(req.user.id);
      return res.json(userTests);
    } catch (e) {
      res.status(401).json(e);
    }
  },
  findTestByIdApi: async (req, res) => {
    const { testId } = req.params;
    try {
      const test = await findTestByIdFromDb(testId);
      if (!test) {
        return res.status(404).send('No test found with that id');
      }
      return res.json(test);
    } catch (e) {
      res.status(401).json(e);
    }
  },
  findAllTestsApi: async (req, res) => {
    try {
      const tests = await findAllTestsFromDb();
      return res.json(tests);
    } catch (e) {
      res.status(401).json(e);
    }
  },
  deleteTestByIdApi: async (req, res) => {
    const { testId } = req.params;
    try {
      const testToDelete = await findTestByIdFromDb(testId);
      if (testToDelete.userId !== req.user.id) {
        return res.status(401).send('You are unauthorized to delete this test');
      }
      const deletedTest = await deleteTestByIdFromDb(testId);
      return res.json(deletedTest);
    } catch (e) {
      res.status(401).json(e);
    }
  },
  insertTestApi: async (req, res) => {
    //  req.user // logged in user
    //  req.body // coming from form
    //  req.params // coming from wildcards declared in routes
    const { testDate, testResult } = req.body;
    try {
      const createdTest = await insertTestToDb(testDate, testResult, req.user.id);
      res.json(createdTest);
    } catch (e) {
      res.status(401).json(e);
    }
  },
}
