const Language = require('../models/language');

// Example controller methods
const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createLanguage = async (req, res) => {
  try {
    const newLanguage = await Language.create(req.body);
    res.status(201).json(newLanguage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add other controller methods as needed

module.exports = {
  getAllLanguages,
  createLanguage,
  // Add other exported methods
};
