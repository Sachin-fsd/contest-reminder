import { NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/auth";
import { signToken } from "@/lib/jwt";
import { getGoogleAuthUrl } from "@/lib/googleAuth";

// GET /api/auth/google - visited via a plain link/navigation from the dashboard,
// not fetch(), since it needs to end in a full-page redirect to Google.
export async function GET(req) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Short-lived, signed state token: proves the callback request actually
    // originated from our own redirect (CSRF protection) and tells the callback
    // which app user to attach the resulting Google tokens to.
    const state = signToken(
        { uid: user.id, purpose: "google_calendar_connect" },
        { expiresIn: "10m" },
    );

    try {
        return NextResponse.redirect(getGoogleAuthUrl(state));
    } catch (error) {
        console.error("Failed to build Google auth URL:", error.message);
        return NextResponse.redirect(
            new URL("/dashboard?calendar=error&reason=config", req.url),
        );
    }
}
