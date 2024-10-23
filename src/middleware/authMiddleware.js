const jwt = require("jsonwebtoken");
const UserModel = require('../models/user.model.js');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ status: "fail", message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ status: "fail", message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ status: "fail", message: "Invalid token" });
  }
};

module.exports = authMiddleware;
