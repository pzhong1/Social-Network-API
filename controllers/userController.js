const { User, Thought } = require('../models');//Import the User and Thought models from the '../models' directory.


const userController = {
  // Get all users
  async getAllUsers(req, res) {////Declare an asynchronous function named getAllUsers that takes the request object) the response object.
    try { //try and catch method for async 
      const users = await User.find()//Asynchronously fetch all the users from the User model
      .exec();
      res.json(users);//Send the retrieved users as a JSON response
    } catch (err) { // if find err then send 500 error status
      res.status(500).json(err);
    }
  },

  // Get single user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
      .exec();
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with this id' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'No user found with this id' });
      }
      await Thought.deleteMany({ username: deletedUser.username });
      res.json({ message: ' Deleted successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to user's friend list
  async addFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },  // Use $addToSet to avoid duplicate adds
        { new: true }// make sure is updated
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with this id' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from user's friend list
  async removeFriend(req, res) { //Declare an asynchronous function named removeFriend that accepte request and response
    try { //use try and catch method
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },//use pull to remove a friends id from the friend list 
        { new: true }//use new: true to make sure return the updated user
      );
      if (!updatedUser) {//Check if no user was found with the provided ID
        return res.status(404).json({ message: 'No user found with this id' });//if no then send 404 status code 
      }
      res.json(updatedUser);//if the user was successfully updated, send the updated user's data as a JSON response.
    } catch (err) {// if any error then 
      res.status(500).json(err); // send 500 status code 
    }
  }
};


module.exports = userController;
