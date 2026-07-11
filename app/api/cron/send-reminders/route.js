import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendContestReminder } from "@/lib/mail";
import { syncContestToCalendar } from "@/lib/googleCalendar";
import { fetchAllContests } from "@/services";
import { SUPPORTED_PLATFORM_IDS } from "@/utils/platforms";

function normalizePlatformId(platform) {
  return String(platform || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "")
    .split(/[/?#]/)[0];
}

function matchesPreferredPlatform(contestPlatform, preferredPlatforms = []) {
  const normalizedContestPlatform = normalizePlatformId(contestPlatform);
  return preferredPlatforms.some((platform) => {
    const normalizedPlatform = normalizePlatformId(platform);
    return normalizedPlatform === normalizedContestPlatform;
  });
}

function isWithinReminderWindow(contest, reminderBeforeHours) {
  const start = new Date(contest.startTime).getTime();
  const now = Date.now();
  return start >= now && start <= now + reminderBeforeHours * 60 * 60 * 1000;
}

// Platform + timing preferences are shared across channels: whichever
// contests are "due" for a user's email also decide when they're due for
// their calendar. Email and calendar are still independently enabled/disabled.
function getReminderPreferences(user) {
  const email = user.notificationPreferences?.email || {};
  const calendar = user.notificationPreferences?.calendar || {};

  return {
    platforms: Array.isArray(email.platforms) && email.platforms.length
      ? email.platforms
      : [...SUPPORTED_PLATFORM_IDS],
    reminderBeforeHours: Number(email.reminderBeforeHours) || 24,
    emailEnabled: email.enabled !== false,
    calendarEnabled: calendar.enabled === true && user.googleCalendar?.connected === true,
  };
}

export async function POST(req) {

  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    await connectDB();
    const contests = await fetchAllContests();
    const users = await User.find(
      {},
      "email name notificationPreferences googleCalendar.connected",
    ).lean();

    if (!contests.length) {
      console.warn("Reminder cron found no contests. Check the contest feed and environment variables.");
    }

    if (!users.length) {
      console.warn("Reminder cron found no users to notify.");
    }

    const emailJobs = [];
    const calendarJobs = [];

    for (const user of users) {
      const preferences = getReminderPreferences(user);
      if (!preferences.emailEnabled && !preferences.calendarEnabled) continue;

      const matchingContests = contests.filter(
        (contest) =>
          matchesPreferredPlatform(contest.platform, preferences.platforms) &&
          isWithinReminderWindow(contest, preferences.reminderBeforeHours),
      );

      for (const contest of matchingContests) {
        if (preferences.emailEnabled) {
          emailJobs.push({ userEmail: user.email, userName: user.name, contest });
        }
        if (preferences.calendarEnabled) {
          calendarJobs.push({ userId: user._id, contest });
        }
      }
    }

    const [emailResults, calendarResults] = await Promise.all([
      Promise.allSettled(emailJobs.map((job) => sendContestReminder(job))),
      Promise.allSettled(
        calendarJobs.map((job) => syncContestToCalendar(job.userId, job.contest)),
      ),
    ]);

    const emailsSent = emailResults.filter((result) => result.status === "fulfilled").length;

    const calendarEventsCreated = calendarResults.filter(
      (result) => result.status === "fulfilled" && result.value?.status === "created",
    ).length;
    const calendarEventsAlreadySynced = calendarResults.filter(
      (result) => result.status === "fulfilled" && result.value?.status === "exists",
    ).length;
    const calendarFailures = calendarResults.filter((result) => result.status === "rejected");

    calendarFailures.forEach((failure) => {
      console.error("Calendar sync failed:", failure.reason?.message || failure.reason);
    });

    return NextResponse.json({
      success: true,
      emailsSent,
      emailsQueued: emailsSent,
      contestsFound: contests.length,
      usersChecked: users.length,
      emailJobsCreated: emailJobs.length,
      calendarJobsCreated: calendarJobs.length,
      calendarEventsCreated,
      calendarEventsAlreadySynced,
      calendarSyncFailures: calendarFailures.length,
    });
  } catch (error) {
    console.error("Reminder cron failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send reminders", error: error.message },
      { status: 500 },
    );
  }
}
