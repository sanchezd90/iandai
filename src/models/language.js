const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  // other language details
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
