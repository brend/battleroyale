// Middleware for authentication and token handling
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

function generateToken(user) {
  const payload = { id: user._id, username: user.username };
  const options = { expiresIn: '2h' };
  return jwt.sign(payload, secretKey, options);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error(err, token);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = { generateToken, authenticateToken };