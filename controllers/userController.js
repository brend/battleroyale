// Controller for user-related operations
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../middleware/authMiddleware');

async function registerUser(req, res) {
  try {
    // Validate input...

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('User already exists.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create and save the user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Send verification email...
    console.log('User created:', savedUser);

    res.status(201).send('User created.');
  } catch (error) {
    res.status(500).send('Error registering new user.');
  }
}

async function loginUser(req, res) {
  try {
    // Validate input...

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send('User not found.');
    }

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(400).send('Invalid password.');
    }

    // Generate JWT...
    const token = generateToken(user);

    res.status(200).send(token);
  } catch (error) {
      res.status(500).send('Error logging in.');
  }
}

function getUserProfile(req, res) {
  res.send(`Welcome to your profile, ${req.user.username}!`);
}

module.exports = { registerUser, loginUser, getUserProfile };