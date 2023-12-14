const Activity = require('../models/activity');

// Get all activities with related exercises
const getAllActivities = async (req, res) => {
    try {
      const activities = await Activity.find().populate('exercises'); // Use populate to fetch related exercises
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get one activity by ID with related exercises
  const getActivityById = async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id).populate('exercises'); // Use populate to fetch related exercises
      if (activity) {
        res.json(activity);
      } else {
        res.status(404).json({ message: 'Activity not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Create a new activity
const createActivity = async (req, res) => {
  const activity = new Activity(req.body);
  try {
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing activity
const updateActivity = async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an activity
const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
