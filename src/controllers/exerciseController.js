const Exercise = require('../models/exercise');

// Create a new exercise
const createExercise = async (req, res) => {
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all exercises with related activity data
const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an exercise by ID with related activity data
const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.exerciseId).populate('activity');
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an exercise by ID
const updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an exercise by ID
const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
};
