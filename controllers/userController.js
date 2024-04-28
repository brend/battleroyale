// Controller for user-related operations
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../middleware/authMiddleware');

function errobj(message) {
  return {message: message};
}

async function registerUser(req, res) {
  try {
    // Validate input...

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send(errobj('User already exists.'));
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
    res.status(500).send(errobj('Error registering new user.'));
  }
}

async function loginUser(req, res) {
  try {
    // Validate input...

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send(errobj('User not found.'));
    }

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        return res.status(400).send(errobj('Invalid password.'));
    }

    // Generate JWT...
    const token = generateToken(user);

    res.status(200).send({user, token});
  } catch (error) {
      res.status(500).send(errobj('Error logging in.'));
  }
}

async function updateProfile(req, res) {
  try {
    // Validate input...

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(404).send(errobj('User not found.'));
    }

    // Update user data...
    user.username = req.body.username ?? user.username;
    user.email = req.body.email ?? user.email;
//    user.password = req.body.password ?? user.password;
  
    const updatedUser = await user.save();
  
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(errobj('Error updating user data.'));
  }
}

async function getProfile(req, res) {
  try {
    // Validate input...

    // Check if user exists
    console.log("Trying to find user with email:", req.query.email, "or username:", req.query.username);
    let user = await User.findOne({ email: req.query.email }) 
      ?? User.findOne({ username: req.query.username });

    if (!user) {
        return res.status(404).send(errobj('User not found.'));
    }

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(errobj('Error getting user data.'));
  }
}

module.exports = { registerUser, loginUser, getProfile, updateProfile };