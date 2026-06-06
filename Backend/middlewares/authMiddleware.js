const jwt= require("jsonwebtoken");
const User = require("../models/User");


const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header is present and properly formatted
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Authorization header missing or malformed" });
        }

        const token = authHeader.split(" ")[1]; // Safely extract token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.userId = decoded.userId;
        req.user = user; // Store user ID in request object
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};




// //Role based middleware
// const isAdmin = (req, res, next) => {
//     if(req.user.role !== "admin") {
//         return res.status(403).json({ error: "Access denied, admin only" });
//     }
//     next();
// };

module.exports = {
    verifyToken
    // isAdmin
};
