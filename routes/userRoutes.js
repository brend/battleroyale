// Routes related to user operations
const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserData } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.put('/updateUserData', authenticateToken, updateUserData);

module.exports = router;