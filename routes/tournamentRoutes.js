// Routes related to tournament operations
const express = require('express');
const { create, remove, update, list } = require('../controllers/tournamentController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { authenticateAdmin } = require('../middleware/authAdminMiddleware');

const router = express.Router();

router.post('/create', authenticateToken, authenticateAdmin, create);
router.post('/remove', authenticateToken, authenticateAdmin, remove);
router.put('/update', authenticateToken, authenticateAdmin, update);
router.get('/list', authenticateToken, authenticateAdmin, list);

module.exports = router;