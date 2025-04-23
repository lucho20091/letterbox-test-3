const rateLimit = require('express-rate-limit');

const signupLimiter = rateLimit({
    windowMs: 2 * 24 * 60 * 60 * 1000, // 2 days
    max: 2, // limit each IP to 2 requests per windowMs
    message: 'Too many requests from this IP, please try again after 2 days'
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 3, // limit each IP to 3 requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

module.exports = { signupLimiter, loginLimiter };
