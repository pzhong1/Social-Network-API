const { Thought } = require('../models');//Importing the Thought to interact with thoughts collection in database

const thoughtController = { //define an thoughtController object  to handle HTTP requests

  // Get all thoughts
  async getAllThoughts(req, res) {//Declare an asynchronous function named getAllUsers that takes the request object) the response object.
    try {//use try and catch method 
      const thoughts = await Thought.find(); //use find method to fetch all thoughts from database
      res.json(thoughts);// send it in json format if no error 
    } catch (err) {
      res.status(500).json(err); // send error code 500 if there is error
    }
  },

  // Get single thought by ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json({ message: 'Thought deleted successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;
