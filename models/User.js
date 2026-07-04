const mongoose = require("mongoose");
const { SUPPORTED_PLATFORM_IDS } = require("@/utils/platforms");
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
    notificationPreferences: {
      email: {
        enabled: { type: Boolean, default: true },
        platforms: { type: [String], default: () => SUPPORTED_PLATFORM_IDS },
        reminderBeforeHours: { type: Number, default: 24 },
      },
    },
    isVerified: { type: Boolean, default: false },
    lastReminderSent: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
