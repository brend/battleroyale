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
      username: req.body.username ?? req.body.email,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Send verification email...
    console.log('User created:', savedUser);

    // Generate JWT
    const token = generateToken(user);

    res.status(201).send({user, token});
  } catch (error) {
    console.error(error);
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

    res.status(200).send({user, token});
  } catch (error) {
      res.status(500).send('Error logging in.');
  }
}

async function updateUserData(req, res) {
  try {
    // Validate input...

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send('User not found.');
    }

    // Update user data...
    user.username = req.body.username ?? user.username;
    user.email = req.body.email ?? user.email;
//    user.password = req.body.password ?? user.password;
  
    const updatedUser = await user.save();
  
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user data.');
  }
}

function getUserProfile(req, res) {
  console.log("returning sample user profile", req);
  res.send({username: "Fester Testerbester", email: "fester@tester.com"});
}

module.exports = { registerUser, loginUser, getUserProfile, updateUserData };