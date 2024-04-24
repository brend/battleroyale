// Database connection setup
const mongoose = require('mongoose');
const { mongoURI } = require('../config/config');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
  }
};

module.exports = connectDB;