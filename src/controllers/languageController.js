// src/controllers/languageController.js
const Language = require('../models/language');

const getAllLanguages = async (req, res) => {
  try {
    const languages = await Language.find();    
    res.json(languages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getLanguageById = async (req, res) => {
  const { languageId } = req.params;
  try {
    const language = await Language.findById(languageId);
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    res.json(language);
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

const updateLanguage = async (req, res) => {
  const { languageId } = req.params;
  try {
    const updatedLanguage = await Language.findByIdAndUpdate(languageId, req.body, { new: true });
    if (!updatedLanguage) {
      return res.status(404).json({ message: 'Language not found' });
    }
    res.json(updatedLanguage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteLanguage = async (req, res) => {
  const { languageId } = req.params;
  try {
    const deletedLanguage = await Language.findByIdAndDelete(languageId);
    if (!deletedLanguage) {
      return res.status(404).json({ message: 'Language not found' });
    }
    res.json({ message: 'Language deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
