// src/controllers/chatController.js
const Chat = require('../models/chat');

const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getChatById = async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json(chat);
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

const updateChat = async (req, res) => {
  const { chatId } = req.params;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(chatId, req.body, { new: true });
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteChat = async (req, res) => {
  const { chatId } = req.params;
  try {
    const deletedChat = await Chat.findByIdAndDelete(chatId);
    if (!deletedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllChats,
  getChatById,
  createChat,
  updateChat,
  deleteChat,
};
