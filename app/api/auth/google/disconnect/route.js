import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { getCurrentUser } from "@/utils/auth";
import { decrypt } from "@/lib/crypto";
import { revokeGoogleToken } from "@/lib/googleAuth";

// POST /api/auth/google/disconnect - called via fetch() from the dashboard,
// mirroring the existing /api/auth/logout pattern.
export async function POST() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(currentUser.id).select(
        "+googleCalendar.accessToken +googleCalendar.refreshToken",
    );
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const refreshToken = decrypt(user.googleCalendar?.refreshToken);
    const accessToken = decrypt(user.googleCalendar?.accessToken);
    await revokeGoogleToken(refreshToken || accessToken);

    user.googleCalendar = {
        connected: false,
        accessToken: null,
        refreshToken: null,
        expiryDate: null,
        scope: null,
        calendarId: "primary",
        connectedAt: null,
    };

    if (!user.notificationPreferences) user.notificationPreferences = {};
    if (!user.notificationPreferences.calendar) user.notificationPreferences.calendar = {};
    user.notificationPreferences.calendar.enabled = false;

    await user.save();

    return NextResponse.json({ success: true });
}
