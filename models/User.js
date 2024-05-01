const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User schema.
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Trims whitespace
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Regex pattern for email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  roles: {
    type: [String],
    default: ['user']
  },
});

// Middleware to handle updating the 'updated_at' field.
userSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

// Create the model from the schema.
const User = mongoose.model('User', userSchema);

module.exports = User;