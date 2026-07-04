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
