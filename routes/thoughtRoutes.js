const router = require('express').Router();//Import the Router function from the 'express' library and initialize a new router
const {// Import controller functions from the 'thoughtController' from controllers folder
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../controllers/thoughtController');// this is path 

router.route('/')
//set up two HTTP methods. A GET request retrieves all thoughts, and a POST request creates a new thought.
  .get(getAllThoughts)
  .post(createThought);

router.route('/:id')
  .get(getThoughtById)//GET
  .put(updateThought)//PUT
  .delete(deleteThought);//DELETE

router.route('/:thoughtId/reactions')
  .post(addReaction)//POST

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);//DELETE

module.exports = router;
