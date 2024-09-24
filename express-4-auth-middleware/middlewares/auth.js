const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomString"; // Ensure consistency with the secret in index.js

const auth = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decodedInformation = jwt.verify(token, JWT_SECRET);
        req.user = decodedInformation; // Passing decoded JWT info to the route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}; 
 
module.exports = auth;
