const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/apiRoutes');
const connectToDatabase = require('./config/dbConfig');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const db = connectToDatabase();

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
