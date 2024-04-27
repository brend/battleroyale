const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Tournament schema
const tournamentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  game: {
    type: String,
    required: true,
    trim: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Middleware to handle updating the 'updated_at' field
tournamentSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

// Create the model from the schema
const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;