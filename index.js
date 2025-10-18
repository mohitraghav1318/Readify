const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./config/database');
const { isAuthenticated } = require('./middleware/auth');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const libraryRoutes = require('./routes/library');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB once, through your config file
connectDB()
    .then(() => {
        console.log("✅ Connected to MongoDB");
        // Start server only after successful DB connection
        app.listen(PORT, () => {
            console.log(`Readify server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ DB connection failed:", err);
        process.exit(1);
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        touchAfter: 24 * 3600
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(isAuthenticated);

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/library', libraryRoutes);
app.use('/dashboard', dashboardRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Page Not Found' });
});
