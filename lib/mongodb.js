const mongoose = require("mongoose");
let cached = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = cached;
async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!process.env.MONGODB_URI)
    throw new Error("MONGODB_URI is not configured");
  cached.promise ||= mongoose.connect(process.env.MONGODB_URI, {
    bufferCommands: false,
  });
  cached.conn = await cached.promise;
  return cached.conn;
}
module.exports = connectDB;
