import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendContestReminder } from "@/lib/mail";
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

function getEmailPreferences(user) {
  const email = user.notificationPreferences?.email || {};
  return {
    enabled: email.enabled !== false,
    platforms: Array.isArray(email.platforms) && email.platforms.length
      ? email.platforms
      : [...SUPPORTED_PLATFORM_IDS],
    reminderBeforeHours: Number(email.reminderBeforeHours) || 24,
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
    const users = await User.find({}, "email name notificationPreferences").lean();

    if (!contests.length) {
      console.warn("Reminder cron found no contests. Check the contest feed and environment variables.");
    }

    if (!users.length) {
      console.warn("Reminder cron found no users to notify.");
    }

    const emailJobs = users.flatMap((user) => {
      const emailPreferences = getEmailPreferences(user);
      if (!emailPreferences.enabled) return [];

      const matchingContests = contests.filter(
        (contest) =>
          matchesPreferredPlatform(contest.platform, emailPreferences.platforms) &&
          isWithinReminderWindow(contest, emailPreferences.reminderBeforeHours),
      );

      return matchingContests.map((contest) => ({
        userEmail: user.email,
        userName: user.name,
        contest,
      }));
    });

    const results = await Promise.allSettled(
      emailJobs.map((job) => sendContestReminder(job)),
    );
    const emailsSent = results.filter((result) => result.status === "fulfilled").length;

    return NextResponse.json({
      success: true,
      emailsSent,
      emailsQueued: emailsSent,
      contestsFound: contests.length,
      usersChecked: users.length,
      emailJobsCreated: emailJobs.length,
    });
  } catch (error) {
    console.error("Reminder cron failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send reminders", error: error.message },
      { status: 500 },
    );
  }
}
