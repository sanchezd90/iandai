// src/controllers/userController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

let jwtSecretKey = null;

const initializeJwtSecretKey = () => {
  // Generate a random secret key using the crypto module
  jwtSecretKey = crypto.randomBytes(32).toString('hex');
};

// Initialize the JWT secret key when the application starts
initializeJwtSecretKey();

const loginOrCreateUser = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user with the provided email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User already exists, send JWT token
      const token = generateJwtToken(existingUser);
      res.json({ message: 'Login successful', token });
    } else {
      // User doesn't exist, create a new user
      const newUser = await User.create(req.body);

      // Send JWT token for the newly created user
      const token = generateJwtToken(newUser);
      res.status(201).json({ message: 'User created successfully', token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const generateJwtToken = (user) => {
  if (!jwtSecretKey) {
    console.error('JWT secret key is not initialized.');
    return null;
  }

  // Sign the JWT token using the dynamic secret key
  const token = jwt.sign({ userId: user._id, email:user.email }, jwtSecretKey, { expiresIn: '1h' });
  return token;
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginOrCreateUser
};
