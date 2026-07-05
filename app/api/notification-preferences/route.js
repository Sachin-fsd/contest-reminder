import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUser } from "@/utils/auth";
import {
  SUPPORTED_PLATFORM_IDS,
  filterSupportedPlatformIds,
} from "@/utils/platforms";

const DEFAULT_NOTIFICATION_PREFERENCES = {
  email: {
    enabled: true,
    platforms: [...SUPPORTED_PLATFORM_IDS],
    reminderBeforeHours: 24,
  },
};

function normalizeNotificationPreferences(preferences = {}) {
  const email = preferences.email || {};
  const platforms = filterSupportedPlatformIds(
    Array.isArray(email.platforms) ? email.platforms : SUPPORTED_PLATFORM_IDS,
  );

  return {
    email: {
      enabled: email.enabled !== false,
      platforms: platforms.length ? platforms : [...SUPPORTED_PLATFORM_IDS],
      reminderBeforeHours: Number(email.reminderBeforeHours) || 24,
    },
  };
}

async function findCurrentUser() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  await connectDB();
  return User.findById(currentUser.id).select("notificationPreferences");
}

export async function GET() {
  const user = await findCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const notificationPreferences = normalizeNotificationPreferences(
    user.notificationPreferences || DEFAULT_NOTIFICATION_PREFERENCES,
  );

  return NextResponse.json({ success: true, notificationPreferences });
}

export async function PUT(req) {
  const user = await findCurrentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const notificationPreferences = normalizeNotificationPreferences({
    email: {
      ...user.notificationPreferences?.email,
      ...(body.email || {}),
    },
  });

  user.notificationPreferences = notificationPreferences;
  await user.save();

  return NextResponse.json({ success: true, notificationPreferences });
}
