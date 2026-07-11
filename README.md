# Contest Reminder

Production-ready Next.js 16 App Router application for tracking competitive programming contests and queuing reminder emails.

## Stack

- Next.js App Router with JavaScript
- Tailwind CSS dark SaaS dashboard UI
- MongoDB + Mongoose users
- JWT auth in secure HttpOnly cookies
- RabbitMQ producer and one-by-one email worker
- Nodemailer with Mailtrap transport
- External scheduling via cron-jobs.org

## Environment

Copy `.env.example` to `.env.local` and set all required variables. No secrets are committed.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run worker
```

## Cron

Configure cron-jobs.org to call `POST /api/cron/send-reminders` daily at 12 AM with:

```http
Authorization: Bearer <CRON_SECRET>
```

The cron endpoint fetches contests, filters contests starting within 24 hours, loads registered users, and pushes jobs to RabbitMQ. The worker sends emails and retries failures.

## Google Calendar

From the dashboard's Notification Preferences card, a user can connect their own
Google Calendar. Once connected, every contest that would trigger a reminder
email also gets a calendar event with a 30-minute popup reminder, created
idempotently (safe to re-run the cron job without duplicating events). Email
and calendar sync are independently toggleable.

### Google Cloud Console setup

1. Create (or select) a project at https://console.cloud.google.com/.
2. **APIs & Services -> Library** -> enable **Google Calendar API**.
3. **APIs & Services -> OAuth consent screen**:
   - User type: External.
   - Add your own Google account under **Test users**. While the app stays in
     "Testing" status, only listed test users can connect - no Google app
     review is required for personal or small-scale use.
4. **APIs & Services -> Credentials -> Create Credentials -> OAuth client ID**:
   - Application type: **Web application**
   - Authorized JavaScript origins: `http://localhost:3000` (add your
     production URL later, e.g. `https://yourdomain.com`)
   - Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`
     (add `https://yourdomain.com/api/auth/google/callback` for production -
     must match `GOOGLE_REDIRECT_URI` exactly)
5. Copy the Client ID and Client Secret into your env file:

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
TOKEN_ENCRYPTION_KEY=
```

`TOKEN_ENCRYPTION_KEY` (64 hex chars) encrypts stored Google tokens at rest and
isn't a Google value - generate your own with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

While the consent screen is in "Testing" status, Google shows an "unverified
app" warning before a test user can continue - click **Advanced -> Go to
(app name) (unsafe)**. That's expected and only goes away if you submit the
app for Google's verification review.
