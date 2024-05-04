// Routes related to entry operations
const express = require('express');
const { listEntries, upsertEntry } = require('../controllers/entryController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/list', authenticateToken, listEntries);
router.put('/upsert', authenticateToken, upsertEntry);

module.exports = router;