const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true },
    preferredPlatforms: {
      type: [String],
      default: ["leetcode", "codeforces", "atcoder"],
    },
    isVerified: { type: Boolean, default: false },
    lastReminderSent: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
