const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: false },
  email: { type: String, required: true },  
  // other user details
});

const User = mongoose.model('User', userSchema);

module.exports = User;
