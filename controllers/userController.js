const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!users) {
        return res.status(404).json({ message: 'No users with that ID' });
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const users = await User.create(req.body);
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const users = await User.findOneAndDelete({ _id: req.params.userId});

      if (!users) {
        res.status(404).json({ message: 'No users with that ID' });
      }

      await Student.deleteMany({ _id: { $in: users.students } });
      res.json({ message: 'User deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const users = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!users) {
        res.status(404).json({ message: 'No users with this id!' });
      }

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
