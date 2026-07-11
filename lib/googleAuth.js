const axios = require("axios");

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_REVOKE_URL = "https://oauth2.googleapis.com/revoke";

// Only asks for permission to manage events, not full account/calendar-list access.
const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events";

function getEnv(name) {
    const value = process.env[name];
    if (!value) throw new Error(`${name} missing`);
    return value;
}

// Builds the URL the user's browser is redirected to in order to grant access.
// `state` should be a short-lived signed token (see app/api/auth/google/route.js)
// so the callback can verify the request wasn't forged and knows which app user it belongs to.
function getGoogleAuthUrl(state) {
    const params = new URLSearchParams({
        client_id: getEnv("GOOGLE_CLIENT_ID"),
        redirect_uri: getEnv("GOOGLE_REDIRECT_URI"),
        response_type: "code",
        scope: CALENDAR_SCOPE,
        access_type: "offline", // required to receive a refresh_token
        prompt: "consent", // forces a refresh_token on every connect, even for returning users
        include_granted_scopes: "true",
        state,
    });

    return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

// Exchanges a one-time authorization code for access_token + refresh_token.
async function exchangeCodeForTokens(code) {
    const params = new URLSearchParams({
        code,
        client_id: getEnv("GOOGLE_CLIENT_ID"),
        client_secret: getEnv("GOOGLE_CLIENT_SECRET"),
        redirect_uri: getEnv("GOOGLE_REDIRECT_URI"),
        grant_type: "authorization_code",
    });

    const { data } = await axios.post(GOOGLE_TOKEN_URL, params.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return data; // { access_token, refresh_token, expires_in, scope, token_type }
}

// Uses a stored refresh_token to mint a new short-lived access_token.
async function refreshAccessToken(refreshToken) {
    const params = new URLSearchParams({
        refresh_token: refreshToken,
        client_id: getEnv("GOOGLE_CLIENT_ID"),
        client_secret: getEnv("GOOGLE_CLIENT_SECRET"),
        grant_type: "refresh_token",
    });

    const { data } = await axios.post(GOOGLE_TOKEN_URL, params.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return data; // { access_token, expires_in, scope, token_type } (no new refresh_token)
}

// Best-effort revoke on disconnect. Failures are swallowed since the local
// disconnect (clearing stored tokens) should succeed regardless.
async function revokeGoogleToken(token) {
    if (!token) return;

    try {
        await axios.post(GOOGLE_REVOKE_URL, new URLSearchParams({ token }).toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
    } catch (error) {
        console.warn("Google token revoke failed (continuing):", error.message);
    }
}

module.exports = {
    CALENDAR_SCOPE,
    getGoogleAuthUrl,
    exchangeCodeForTokens,
    refreshAccessToken,
    revokeGoogleToken,
};
