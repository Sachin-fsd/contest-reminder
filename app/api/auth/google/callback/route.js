import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/jwt";
import { encrypt } from "@/lib/crypto";
import { exchangeCodeForTokens } from "@/lib/googleAuth";

function redirectWithStatus(req, params) {
    const url = new URL("/dashboard", req.url);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
    return NextResponse.redirect(url);
}

// GET /api/auth/google/callback - Google redirects the user's browser here
// after they approve (or deny) access on the consent screen.
export async function GET(req) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const googleError = url.searchParams.get("error");

    if (googleError) {
        // e.g. the user clicked "Cancel" on the consent screen - not a bug.
        return redirectWithStatus(req, { calendar: "error", reason: "denied" });
    }

    if (!code || !state) {
        return redirectWithStatus(req, { calendar: "error", reason: "missing_params" });
    }

    let statePayload;
    try {
        statePayload = verifyToken(state);
        if (statePayload.purpose !== "google_calendar_connect") throw new Error("wrong token purpose");
    } catch {
        return redirectWithStatus(req, { calendar: "error", reason: "invalid_state" });
    }

    try {
        const tokens = await exchangeCodeForTokens(code);

        await connectDB();
        const user = await User.findById(statePayload.uid).select(
            "+googleCalendar.accessToken +googleCalendar.refreshToken",
        );
        if (!user) throw new Error("user not found");

        user.googleCalendar = {
            connected: true,
            accessToken: encrypt(tokens.access_token),
            // Google only reliably returns a refresh_token because we pass
            // prompt=consent, but fall back to any previously stored one just in case.
            refreshToken: tokens.refresh_token ? encrypt(tokens.refresh_token) : user.googleCalendar?.refreshToken,
            expiryDate: Date.now() + tokens.expires_in * 1000,
            scope: tokens.scope,
            calendarId: user.googleCalendar?.calendarId || "primary",
            connectedAt: new Date(),
        };

        if (!user.notificationPreferences) user.notificationPreferences = {};
        if (!user.notificationPreferences.calendar) user.notificationPreferences.calendar = {};
        user.notificationPreferences.calendar.enabled = true;

        await user.save();

        return redirectWithStatus(req, { calendar: "connected" });
    } catch (error) {
        console.error("Google Calendar connect failed:", error.message);
        return redirectWithStatus(req, { calendar: "error", reason: "connect_failed" });
    }
}
