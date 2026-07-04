const { cookies } = require("next/headers");
const { verifyToken } = require("@/lib/jwt");
async function getCurrentUser() {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;
    try {
        return verifyToken(token);
    } catch {
        return null;
    }
}
function sanitizeString(value) {
    return String(value || "")
        .trim()
        .replace(/[<>]/g, "");
}
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
module.exports = { getCurrentUser, sanitizeString, validateEmail };
