const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
  const token = req.headers.token; // ✅ tu isi me bhej raha hai

  if (!token) {
    return res.status(403).json({
      message: "Token missing ❌",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD); // ✅ safe verify
    if (!decoded || !decoded.id) {
      return res.status(403).json({ message: "Invalid token ❌" });
    }

    req.userId = decoded.id; // ✅ set admin id
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(403).json({
      message: "Invalid or expired token ❌",
    });
  }
}

module.exports = {
  adminMiddleware,
};
