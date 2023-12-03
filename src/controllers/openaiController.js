// src/controllers/openaiController.js
const OpenAI = require("openai");
const dotenv = require('dotenv');
const chatController = require('../controllers/chatController');

dotenv.config();

const createOpenAIChat = async (req, res) => {
  const { systemMessageContent, userId, exerciseId, languageId } = req.body;
  const messages = [
    {
      "role": "system",
      "content": systemMessageContent,
    }
  ]
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 1.51,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });    
    const chatPayload = {
      userId,
      exerciseId,
      languageId,
      messages:[...messages,response.choices[0].message]
    }    
    await chatController.createChat({ body: chatPayload }, res);

  } catch (error) {
    // Handle errors here
    console.error("Error during OpenAI API call:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateOpenAIChat = async (req, res) => {             
  const { messages } = req.body  
  const { chatId } = req.params
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages.map(message=>{return {role:message.role,content:message.content}}),
      temperature: 1.51,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });           
    await chatController.updateChat({ params:{chatId:chatId}, body: {messages:[...messages,response.choices[0].message]} }, res);

  } catch (error) {
    // Handle errors here
    console.error("Error during OpenAI API call:", error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
    createOpenAIChat,
    updateOpenAIChat
  };
