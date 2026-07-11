const jwt = require("jsonwebtoken");
function signToken(payload, options = {}) {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d", ...options });
}
function verifyToken(token) {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");
    return jwt.verify(token, process.env.JWT_SECRET);
}
module.exports = { signToken, verifyToken };
