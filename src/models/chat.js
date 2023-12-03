const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'AI'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // additional message properties
});

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
  messages: [messageSchema],
  // other chat details
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
