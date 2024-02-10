// src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const languageController = require('../controllers/languageController');
const chatController = require('../controllers/chatController');
const exerciseController = require('../controllers/exerciseController');
const openaiController = require('../controllers/openaiController');
const activityController = require('../controllers/activityController');


// User Routes
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);
router.post('/users/auth', userController.loginOrCreateUser);

// Language Routes
router.get('/languages', languageController.getAllLanguages);
router.get('/languages/:languageId', languageController.getLanguageById);
router.post('/languages', languageController.createLanguage);
router.put('/languages/:languageId', languageController.updateLanguage);
router.delete('/languages/:languageId', languageController.deleteLanguage);

// Chat Routes
router.get('/chats', chatController.getAllChats);
router.get('/chats/:chatId', chatController.getChatById);
router.post('/chats', chatController.createChat);
router.post('/chats/user', chatController.getAllChatsForUser);
router.put('/chats/:chatId', chatController.updateChat);
router.delete('/chats/:chatId', chatController.deleteChat);

// Exercise Routes
router.get('/exercises', exerciseController.getAllExercises);
router.get('/exercises/:exerciseId', exerciseController.getExerciseById);
router.post('/exercises', exerciseController.createExercise);
router.put('/exercises/:exerciseId', exerciseController.updateExercise);
router.delete('/exercises/:exerciseId', exerciseController.deleteExercise);

// Activity Routes
router.get('/activities/', activityController.getAllActivities);
router.get('/activities/:id', activityController.getActivityById);
router.post('/activities/', activityController.createActivity);
router.put('/activities/:id', activityController.updateActivity);
router.delete('/activities/:id', activityController.deleteActivity);

router.post('/openai', openaiController.createOpenAIChat);
router.put('/openai/:chatId', openaiController.updateOpenAIChat);
router.post('/openai/help', openaiController.getHelp);

module.exports = router;
