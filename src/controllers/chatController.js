const Chat = require('../models/chat');

// Example controller methods
const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createChat = async (req, res) => {
  try {
    const newChat = await Chat.create(req.body);
    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add other controller methods as needed

module.exports = {
  getAllChats,
  createChat,
  // Add other exported methods
};
