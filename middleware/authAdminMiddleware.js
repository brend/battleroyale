const User = require('../models/User.js');

async function authenticateAdmin(req, res, next) {
    const user = await User.findById(req.user.id);

    if (user?.roles.includes('admin')) {
        next();
    } else {
        res.status(403).send('Unauthorized');
    }
}

module.exports = { authenticateAdmin };