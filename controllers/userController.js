const {
  fetchUsers,
  fetchUserByIdFromDb,
  insertUserToDb,
  deleteUserByIdFromDb,
} = require('../model/userOrm');

module.exports = {
  getAllUsersApi: async (req, res) => {
    try {
      const users = await fetchUsers();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(400)
        .json(e);
    }
  },
  getUserByIdApi: async (req, res) => {
    const { userId } = req.params;
    try {
      res.json(await fetchUserByIdFromDb(userId));
    } catch (e) {
      console.log('i am broken L:38', e);
      res.status(400)
        .json(e);
    }
  },
  deleteUserByIdApi: async (req, res) => {
    console.log(req.user);
    const { userId } = req.params;
    if (parseInt(userId) !== req.user.id) {
      return res.status(401)
        .json({ error: 'You cannot delete a user that is not yourself' });
    }
    try {
      const deletedUser = await deleteUserByIdFromDb(userId);
      res.json(deletedUser);
    } catch (e) {
      console.log('i am broken L:48', e);
      res.status(400)
        .json(e);
    }
  },
};
