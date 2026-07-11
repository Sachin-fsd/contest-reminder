const crypto = require("crypto");

const ALGO = "aes-256-gcm";

function getKey() {
    const keyHex = process.env.TOKEN_ENCRYPTION_KEY;
    if (!keyHex) throw new Error("TOKEN_ENCRYPTION_KEY missing");

    const key = Buffer.from(keyHex, "hex");
    if (key.length !== 32) {
        throw new Error("TOKEN_ENCRYPTION_KEY must be 64 hex characters (32 bytes)");
    }
    return key;
}

// Encrypts a string for storage. Returns "iv:authTag:ciphertext" (all base64),
// or null if given an empty value (so "no token" stays representable as null).
function encrypt(plainText) {
    if (!plainText) return null;

    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGO, getKey(), iv);
    const encrypted = Buffer.concat([
        cipher.update(String(plainText), "utf8"),
        cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    return [iv.toString("base64"), authTag.toString("base64"), encrypted.toString("base64")].join(":");
}

// Reverses encrypt(). Returns null for empty/malformed input rather than throwing,
// so a missing/blank stored value just behaves like "no token".
function decrypt(payload) {
    if (!payload) return null;

    const parts = payload.split(":");
    if (parts.length !== 3) return null;

    const [ivB64, authTagB64, dataB64] = parts;
    const iv = Buffer.from(ivB64, "base64");
    const authTag = Buffer.from(authTagB64, "base64");
    const data = Buffer.from(dataB64, "base64");

    const decipher = crypto.createDecipheriv(ALGO, getKey(), iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    return decrypted.toString("utf8");
}

module.exports = { encrypt, decrypt };
