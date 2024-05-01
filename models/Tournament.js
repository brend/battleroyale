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
  maximum_participants: {
    type: Number,
    required: true,
    min: 2
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
}, {timestamps: true});

// Create the model from the schema
const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;