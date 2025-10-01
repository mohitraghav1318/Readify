module.exports = {
    requireAuth: (req, res, next) => {
        if (req.session && req.session.userId) {
            return next();
        }
        res.redirect('/login');
    },

    isAuthenticated: (req, res, next) => {
        res.locals.isAuthenticated = !!(req.session && req.session.userId);
        res.locals.user = req.session.user || null;
        next();
    }
};
