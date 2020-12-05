const db = require('../model');

module.exports = {
  createTestData: async (req, res) => {
    const { testDate, testResult } = req.body;
    try {
      const newTest = await db.TestData.create({
        testDate,
        testResult,
        user: req.user._id,
      });

      req.user.testData.push(newTest._id);
      await req.user.save();

      res.json(newTest);
    } catch (e) {
      console.log('TestData controller', e);
      res.status(401).json(e);
    }
  },
  findAllTestData: async (req, res) => {
    try {
      const allTests = await db.TestData.find({});
      res.json(allTests);
    } catch (e) {
      console.log(e);
      res.status(401).json(e);
    }

  },
  findTestDataById: async (req, res) => {
    const { testId } = req.params;
    try {
      const testById = await db.TestData.findById(testId).exec();
      res.json(testById);
    } catch (e) {
      console.log(e);
      res.status(401).json(e);
    }
  },
  findTestDataByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const testByUserId = await db.TestData.find({ user: userId }).exec();
      res.json(testByUserId);
    } catch (e) {
      console.log(e);
      res.status(401).json(e);
    }
  },
  deleteTestDataById: async (req, res) => {
    const { testId } = req.params;
    try {
      const testById = await db.TestData.findByIdAndDelete(testId).exec();
      res.json(testById);
    } catch (error) {
      console.log(e);
      res.status(401).json(e);
    }
  },

};
