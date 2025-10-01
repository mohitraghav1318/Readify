const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const User = require('../models/User');
const UserBook = require('../models/UserBook');

router.get('/', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        const readingBooks = await UserBook.find({ user: req.session.userId })
            .populate('book')
            .sort({ startedAt: -1 });

        res.render('dashboard', { user, readingBooks });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.redirect('/');
    }
});

module.exports = router;
