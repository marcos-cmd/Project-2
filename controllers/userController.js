// const {
//   fetchUsers,
//   fetchUserByIdFromDb,
//   deleteUserByIdFromDb,
//   fetchUserByUsernameFromDb,
// } = require('../model/userOrm');

// module.exports = {
//   getAllUsersApi: async (req, res) => {
//     try {
//       const users = await fetchUsers();
//       res.json(users);
//     } catch (e) {
//       console.log(e);
//       res.status(400)
//         .json(e);
//     }
//   },
//   getUserByIdApi: async (req, res) => {
//     const { userId } = req.params;
//     try {
//       res.json(await fetchUserByIdFromDb(userId));
//     } catch (e) {
//       console.log(e);
//       res.status(400)
//         .json(e);
//     }
//   },
//   getUserByUsernameApi: async (req, res) => {
//     const { username } = req.params;
//     try {
//       res.json(await fetchUserByUsernameFromDb(username));
//     } catch (e) {
//       console.log(e);
//       res.status(400)
//         .json(e);
//     }
//   },
//   deleteUserByIdApi: async (req, res) => {
//     console.log(req.user);
//     const { userId } = req.params;
//     if (parseInt(userId) !== req.user.id) {
//       return res.status(401)
//         .json({ error: 'You cannot delete a user that is not yourself' });
//     }
//     try {
//       const deletedUser = await deleteUserByIdFromDb(userId);
//       res.json(deletedUser);
//     } catch (e) {
//       console.log(e);
//       res.status(400)
//         .json(e);
//     }
//   },
// };

const db = require('../model');

module.exports = {
    findAllUsers: async (req, res) => {
        try {
            const allUsers = await db.User.find({});
            res.json(allUsers);
        } catch (e) {
            console.log(e);
            res.status(401).json(e);
        }

    },
    findUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const userById = await db.User.findById(userId).exec();
            res.json(userById);
        } catch (error) {
            console.log(e);
            res.status(401).json(e);
        }
    },
    deleteUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const userById = await db.User.findByIdAndDelete(userId).exec();
            res.json(userById);
        } catch (error) {
            console.log(e);
            res.status(401).json(e);
        }
    },
    updateUserById: async (req, res) => {
        const { userId } = req.params;
        const { username, password } = req.body;
        try {
            const userById = await db.User.findByIdAndUpdate(userId, {
                username, password
            }, { new: true })
            res.json(userById);
        } catch (error) {
            console.log(e);
            res.status(401).json(e);
        }
    },
};
