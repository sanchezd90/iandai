const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  instructions: {
    type: String,
    required: true,
  },
  responseTemplate: {
    type: String,
    required: true,
  },
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
  }],
  name: {
    type: String,
    required: true,
  },
  requires_user_input: {
    type: Boolean,
    required: true,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
