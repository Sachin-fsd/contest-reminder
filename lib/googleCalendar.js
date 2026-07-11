const axios = require("axios");
const crypto = require("crypto");

const User = require("@/models/User");
const { encrypt, decrypt } = require("@/lib/crypto");
const { refreshAccessToken } = require("@/lib/googleAuth");

const CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3/calendars";
const DEFAULT_EVENT_DURATION_SECONDS = 2 * 60 * 60; // fallback if a contest has no known duration
const REFRESH_BUFFER_MS = 60 * 1000; // refresh slightly before actual expiry

// Google Calendar custom event IDs must be lowercase base32hex: [a-v0-9], 5-1024 chars.
// Deriving the id from the contest's own identity (not the user, since every
// user has a separate calendar) makes event creation naturally idempotent:
// re-running the cron job for the same contest just hits "already exists".
function buildDeterministicEventId(contest) {
    const raw = `${contest.platform}|${contest.title}|${contest.startTime}`;
    const hash = crypto.createHash("sha1").update(raw).digest("hex"); // hex chars 0-9a-f only, valid subset
    return `cr${hash}`;
}

function buildEventDescription(contest) {
    const lines = [`Platform: ${contest.platform}`];
    if (contest.url) lines.push(`Link: ${contest.url}`);
    lines.push("Added automatically by Contest Reminder.");
    return lines.join("\n");
}

function buildEventBody(contest, reminderMinutes) {
    const start = new Date(contest.startTime);
    const durationSeconds = Number(contest.duration) > 0 ? Number(contest.duration) : DEFAULT_EVENT_DURATION_SECONDS;
    const end = new Date(start.getTime() + durationSeconds * 1000);

    return {
        id: buildDeterministicEventId(contest),
        summary: contest.title,
        description: buildEventDescription(contest),
        start: { dateTime: start.toISOString(), timeZone: "UTC" },
        end: { dateTime: end.toISOString(), timeZone: "UTC" },
        source: contest.url ? { title: "Contest link", url: contest.url } : undefined,
        reminders: {
            useDefault: false,
            overrides: [{ method: "popup", minutes: reminderMinutes }],
        },
    };
}

// Returns a usable access_token for this user, refreshing (and persisting the
// refreshed token) if the cached one is missing or close to expiry.
// `userDoc` must be a hydrated Mongoose document (not .lean()) with
// googleCalendar.accessToken/refreshToken explicitly selected, since it may need saving.
async function getValidAccessToken(userDoc) {
    const gc = userDoc.googleCalendar;
    if (!gc?.connected || !gc?.refreshToken) return null;

    const isFresh = gc.accessToken && gc.expiryDate && gc.expiryDate - REFRESH_BUFFER_MS > Date.now();
    if (isFresh) return decrypt(gc.accessToken);

    const refreshToken = decrypt(gc.refreshToken);
    const refreshed = await refreshAccessToken(refreshToken);

    userDoc.googleCalendar.accessToken = encrypt(refreshed.access_token);
    userDoc.googleCalendar.expiryDate = Date.now() + refreshed.expires_in * 1000;
    await userDoc.save();

    return refreshed.access_token;
}

async function insertCalendarEvent({ accessToken, calendarId, body }) {
    await axios.post(
        `${CALENDAR_API_BASE}/${encodeURIComponent(calendarId)}/events`,
        body,
        { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } },
    );
}

// Creates (idempotently) a Google Calendar event for one user + one contest.
// Returns { status: "created" | "exists" | "skipped", reason? } and never
// throws for the "expected" outcomes above; it only throws for genuine failures
// (network errors, unexpected API errors) so the caller's Promise.allSettled
// can distinguish real problems from normal no-ops.
async function syncContestToCalendar(userId, contest) {
    const userDoc = await User.findById(userId).select(
        "+googleCalendar.accessToken +googleCalendar.refreshToken",
    );

    if (!userDoc?.googleCalendar?.connected) {
        return { status: "skipped", reason: "not_connected" };
    }

    let accessToken;
    try {
        accessToken = await getValidAccessToken(userDoc);
    } catch (error) {
        // Refresh token is likely revoked/invalid (e.g. user removed access from
        // their Google account). Stop trying until they reconnect.
        userDoc.googleCalendar.connected = false;
        await userDoc.save();
        throw new Error(`Google Calendar reconnect required for ${userDoc.email}: ${error.message}`);
    }

    if (!accessToken) {
        return { status: "skipped", reason: "not_connected" };
    }

    const reminderMinutes = Number(userDoc.notificationPreferences?.calendar?.reminderMinutesBeforeEvent) || 30;
    const calendarId = userDoc.googleCalendar.calendarId || "primary";
    const body = buildEventBody(contest, reminderMinutes);

    try {
        await insertCalendarEvent({ accessToken, calendarId, body });
        return { status: "created" };
    } catch (error) {
        const status = error.response?.status;

        if (status === 409) {
            // Event with this deterministic id already exists - already synced, not an error.
            return { status: "exists" };
        }

        if (status === 401) {
            userDoc.googleCalendar.connected = false;
            await userDoc.save();
        }

        throw error;
    }
}

module.exports = { syncContestToCalendar, buildDeterministicEventId };
