const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        const featuredCategories = await Category.find().limit(6);
        res.render('home', { featuredCategories });
    } catch (error) {
        console.error('Home page error:', error);
        res.render('home', { featuredCategories: [] });
    }
});

module.exports = router;
