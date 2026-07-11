const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    notificationPreferences: {
      email: {
        enabled: {
          type: Boolean,
          default: true,
        },

        platforms: {
          type: [String],
          default: () => [
            "leetcode.com",
            "codeforces.com",
          ],
        },

        reminderBeforeHours: {
          type: [Number],
          default: () => [24],
        },
      },

      calendar: {
        enabled: {
          type: Boolean,
          default: false,
        },

        reminderMinutesBeforeEvent: {
          type: Number,
          default: 30,
        },
      },
    },

    // OAuth connection to the user's own Google Calendar. Tokens are stored
    // encrypted (see lib/crypto.js) and excluded from default query results.
    googleCalendar: {
      connected: {
        type: Boolean,
        default: false,
      },

      accessToken: {
        type: String,
        select: false,
      },

      refreshToken: {
        type: String,
        select: false,
      },

      expiryDate: {
        type: Number,
        default: null,
      },

      scope: {
        type: String,
        default: null,
      },

      calendarId: {
        type: String,
        default: "primary",
      },

      connectedAt: {
        type: Date,
        default: null,
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastReminderSent: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

module.exports =
  mongoose.models.User ||
  mongoose.model("User", UserSchema);