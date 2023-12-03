const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
  name: { type: String, required: true },
  systemPrompt: { type: String, required: true },
  instructions: { type: String, required: true },
  // other exercise details
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
