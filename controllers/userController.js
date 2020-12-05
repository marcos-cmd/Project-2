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
    findUserByUsername: async (req, res) => {
        const { username } = req.params;
        try {
            const User = await db.User.find({ username: username });
            res.json(User);
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
