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
    reminderBeforeHours: [24],
  },
  calendar: {
    enabled: false,
    reminderMinutesBeforeEvent: 30,
  },
};

function normalizeNotificationPreferences(preferences = {}) {
  const email = preferences.email || {};
  const calendar = preferences.calendar || {};

  const platforms = filterSupportedPlatformIds(
    Array.isArray(email.platforms)
      ? email.platforms
      : [...SUPPORTED_PLATFORM_IDS]
  );

  const reminderBeforeHours = Array.isArray(email.reminderBeforeHours)
    ? [...new Set(email.reminderBeforeHours)]
      .map(Number)
      .filter((n) => Number.isFinite(n) && n > 0)
      .sort((a, b) => b - a)
    : [24];

  const reminderMinutesBeforeEvent =
    Number(calendar.reminderMinutesBeforeEvent) > 0
      ? Number(calendar.reminderMinutesBeforeEvent)
      : 30;

  return {
    email: {
      enabled: email.enabled !== false,
      platforms:
        platforms.length > 0
          ? platforms
          : [...SUPPORTED_PLATFORM_IDS],
      reminderBeforeHours:
        reminderBeforeHours.length > 0
          ? reminderBeforeHours
          : [24],
    },
    calendar: {
      enabled: calendar.enabled === true,
      reminderMinutesBeforeEvent,
    },
  };
}

// Calendar sync can only be "on" while an active Google connection exists.
// This clamps any PUT request that tries to enable it without one - the
// frontend should route the user through /api/auth/google instead.
function resolveCalendarEnabled(requestedEnabled, currentEnabled, isConnected) {
  if (typeof requestedEnabled !== "boolean") return currentEnabled;
  if (requestedEnabled && !isConnected) return false;
  return requestedEnabled;
}

async function findCurrentUser() {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  await connectDB();

  return User.findById(currentUser.id).select(
    "notificationPreferences googleCalendar.connected"
  );
}

export async function GET() {
  const user = await findCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const isConnected = Boolean(user.googleCalendar?.connected);
  const normalized = normalizeNotificationPreferences(
    user.notificationPreferences ||
    DEFAULT_NOTIFICATION_PREFERENCES
  );

  return NextResponse.json({
    success: true,
    notificationPreferences: {
      email: normalized.email,
      calendar: {
        ...normalized.calendar,
        enabled: normalized.calendar.enabled && isConnected,
        connected: isConnected,
      },
    },
  });
}

export async function PUT(req) {
  const user = await findCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const isConnected = Boolean(user.googleCalendar?.connected);

  const notificationPreferences =
    normalizeNotificationPreferences({
      email: {
        ...DEFAULT_NOTIFICATION_PREFERENCES.email,
        ...(user.notificationPreferences?.email || {}),
        ...(body.email || {}),
      },
      calendar: {
        ...DEFAULT_NOTIFICATION_PREFERENCES.calendar,
        ...(user.notificationPreferences?.calendar || {}),
        ...(body.calendar || {}),
        enabled: resolveCalendarEnabled(
          body.calendar?.enabled,
          user.notificationPreferences?.calendar?.enabled ?? false,
          isConnected
        ),
      },
    });

  user.notificationPreferences =
    notificationPreferences;

  await user.save();

  return NextResponse.json({
    success: true,
    notificationPreferences: {
      ...notificationPreferences,
      calendar: {
        ...notificationPreferences.calendar,
        connected: isConnected,
      },
    },
  });
}
