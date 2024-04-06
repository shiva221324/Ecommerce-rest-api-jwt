require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "you are not authorized",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "you are not allowed to access this",
      });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message:
          "you are not allowed to access this only admin can access this",
      });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
