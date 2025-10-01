const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        req.session.userId = user._id;
        req.session.user = {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        };

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { error: 'An error occurred. Please try again.' });
    }
});

router.get('/register', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.render('register', { error: null });
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, fullName } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register', { error: 'Email already registered' });
        }

        const user = new User({ email, password, fullName });
        await user.save();

        req.session.userId = user._id;
        req.session.user = {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        };

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Registration error:', error);
        res.render('register', { error: 'An error occurred. Please try again.' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/');
    });
});

module.exports = router;
