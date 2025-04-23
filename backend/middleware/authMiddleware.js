const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, jwt_secret);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(500).json({ message: "Authentication failed" });
    }
}

// Export as an object with the middleware function as a property
module.exports = { authMiddleware };