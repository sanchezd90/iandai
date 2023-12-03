// dbConfig.js

const mongoose = require('mongoose');

const connectToDatabase = () => {
  
// Connect to MongoDB
const username = process.env.USERNAME
const password = process.env.PASSWORD
const db_name = process.env.DB_NAME 

const uri = `mongodb+srv://${username}:${password}@cluster0.tcz8xzq.mongodb.net/${db_name}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
  // Now you can start using mongoose models to interact with your database
});

  return db;
};

module.exports = connectToDatabase;
