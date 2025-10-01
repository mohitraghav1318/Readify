const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Book = require('../models/Book');
const Comment = require('../models/Comment');
const UserBook = require('../models/UserBook');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.render('library', { categories });
    } catch (error) {
        console.error('Library error:', error);
        res.render('library', { categories: [] });
    }
});

router.get('/category/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.redirect('/library');
        }

        const books = await Book.find({ category: req.params.id }).populate('category');
        res.render('category', { category, books });
    } catch (error) {
        console.error('Category error:', error);
        res.redirect('/library');
    }
});

router.get('/book/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('category');
        if (!book) {
            return res.redirect('/library');
        }

        const comments = await Comment.find({ book: req.params.id })
            .populate('user', 'fullName')
            .sort({ createdAt: -1 });

        let isReading = false;
        if (req.session.userId) {
            const userBook = await UserBook.findOne({
                user: req.session.userId,
                book: req.params.id
            });
            isReading = !!userBook;
        }

        const isLiked = book.likedBy.some(id => id.toString() === (req.session.userId || '').toString());

        res.render('book', { book, comments, isReading, isLiked });
    } catch (error) {
        console.error('Book error:', error);
        res.redirect('/library');
    }
});

router.post('/book/:id/like', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.redirect('/library');
        }

        const userId = req.session.userId;
        const isLiked = book.likedBy.includes(userId);

        if (isLiked) {
            book.likedBy = book.likedBy.filter(id => id.toString() !== userId.toString());
            book.likes = Math.max(0, book.likes - 1);
        } else {
            book.likedBy.push(userId);
            book.likes += 1;
        }

        await book.save();
        res.redirect(`/library/book/${req.params.id}`);
    } catch (error) {
        console.error('Like error:', error);
        res.redirect(`/library/book/${req.params.id}`);
    }
});

router.post('/book/:id/comment', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    try {
        const { text } = req.body;
        if (!text || text.trim().length === 0) {
            return res.redirect(`/library/book/${req.params.id}`);
        }

        const comment = new Comment({
            book: req.params.id,
            user: req.session.userId,
            text: text.trim()
        });

        await comment.save();
        res.redirect(`/library/book/${req.params.id}`);
    } catch (error) {
        console.error('Comment error:', error);
        res.redirect(`/library/book/${req.params.id}`);
    }
});

router.post('/book/:id/add-to-reading', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    try {
        const existingUserBook = await UserBook.findOne({
            user: req.session.userId,
            book: req.params.id
        });

        if (existingUserBook) {
            await UserBook.deleteOne({ _id: existingUserBook._id });
        } else {
            const userBook = new UserBook({
                user: req.session.userId,
                book: req.params.id,
                status: 'reading'
            });
            await userBook.save();
        }

        res.redirect(`/library/book/${req.params.id}`);
    } catch (error) {
        console.error('Add to reading error:', error);
        res.redirect(`/library/book/${req.params.id}`);
    }
});

module.exports = router;
