// src/controllers/chatController.js
const jwt = require('jsonwebtoken'); // Import the JSON Web Token library
const { promisify } = require('util'); // Import the 'promisify' function from the 'util' module
require('dotenv').config();

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

let jwtSecretKey = process.env.JWT_SECRET_KEY

const verifyJwt = promisify(jwt.verify);


const getAllChatsForUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized - Bearer token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await verifyJwt(token, jwtSecretKey);    
    const userId = decoded.userId;    
    const chats = await Chat.find({ userId });

    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};



module.exports = {
  getAllChats,
  getChatById,
  createChat,
  updateChat,
  deleteChat,
  getAllChatsForUser
};
