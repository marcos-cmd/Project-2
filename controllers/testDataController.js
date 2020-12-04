// const {
//   findAllTestsFromDb,
//   findTestByIdFromDb,
//   findTestsByUserFromDb,
//   insertTestToDb,
//   deleteTestByIdFromDb,
// } = require('../model/testDataOrm');

// module.exports = {
//   findTestsByLoggedInUserApi: async (req, res) => {
//     try {
//       const userTests = await findTestsByUserFromDb(req.user.id);
//       return res.json(userTests);
//     } catch (e) {
//       res.status(401).json(e);
//     }
//   },
//   findTestByIdApi: async (req, res) => {
//     const { testId } = req.params;
//     try {
//       const test = await findTestByIdFromDb(testId);
//       if (!test) {
//         return res.status(404).send('No test found with that id');
//       }
//       return res.json(test);
//     } catch (e) {
//       res.status(401).json(e);
//     }
//   },
//   findAllTestsApi: async (req, res) => {
//     try {
//       const tests = await findAllTestsFromDb();
//       return res.json(tests);
//     } catch (e) {
//       res.status(401).json(e);
//     }
//   },
//   deleteTestByIdApi: async (req, res) => {
//     const { testId } = req.params;
//     try {
//       const testToDelete = await findTestByIdFromDb(testId);
//       if (testToDelete.userId !== req.user.id) {
//         return res.status(401).send('You are unauthorized to delete this test');
//       }
//       const deletedTest = await deleteTestByIdFromDb(testId);
//       return res.json(deletedTest);
//     } catch (e) {
//       res.status(401).json(e);
//     }
//   },
//   insertTestApi: async (req, res) => {
//     //  req.user // logged in user
//     //  req.body // coming from form
//     //  req.params // coming from wildcards declared in routes
//     const { testDate, testResult } = req.body;
//     try {
//       const createdTest = await insertTestToDb(testDate, testResult, req.user.id);
//       res.json(createdTest);
//     } catch (e) {
//       res.status(401).json(e);
//     }
//   },
// }


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
