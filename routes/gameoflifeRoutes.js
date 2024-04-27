// Routes related to game of life operations
const express = require('express');
const { initial } = require('../controllers/gameoflifeController');

const router = express.Router();

router.get('/initial', initial);

module.exports = router;