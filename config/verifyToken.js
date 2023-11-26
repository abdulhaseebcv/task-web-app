const jwt = require('jsonwebtoken');

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication failed: No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        if (error) return res.status(401).json({ success: false, message: 'Failed to authenticate token' })
        req.decoded = decoded;
        next();
    });
};

module.exports = verifyToken;