const User = require('../models/user_model');

const requireAuth = async (req, res, next) => {
    if (req.session && req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (user) {
                next();
            } else {
                req.session.destroy(err => {
                    if (err) {
                        console.error('Error destroying session:', err);
                    }
                    res.status(401).json({ message: 'Unauthorized' });
                });
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        // User is authenticated, proceed to the next middleware
        return next();
    } else {
        // User is not authenticated, redirect to the login page
        return res.redirect('/index.html');
    }
};

module.exports = { requireAuth, isAuthenticated };
