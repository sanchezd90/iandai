// src/controllers/exerciseController.js
const Exercise = require('../models/exercise');

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getExerciseById = async (req, res) => {
  const { exerciseId } = req.params;
  try {
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createExercise = async (req, res) => {
  try {
    const newExercise = await Exercise.create(req.body);
    res.status(201).json(newExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateExercise = async (req, res) => {
  const { exerciseId } = req.params;
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(exerciseId, req.body, { new: true });
    if (!updatedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(updatedExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteExercise = async (req, res) => {
  const { exerciseId } = req.params;
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
    if (!deletedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
};
