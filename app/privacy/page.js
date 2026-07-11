import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Privacy Policy | ContestReminder",
  description:
    "How ContestReminder collects, uses, and protects your data, including the Google Calendar integration.",
};

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="mt-4 space-y-4 leading-7 text-slate-300">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen bg-[#030712] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl transition hover:border-cyan-500"
        >
          <ChevronLeft size={18} className="transition group-hover:-translate-x-1" />
          Home
        </Link>

        <h1 className="mt-10 text-4xl font-black">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: July 11, 2026</p>

        <div className="mt-10 space-y-10">
          <Section title="Overview">
            <p>
              This Privacy Policy explains how ContestReminder ("ContestReminder",
              "we", "us") collects, uses, stores, and shares information when you
              use the ContestReminder website and dashboard at{" "}
              <span className="text-white">nyro-one.vercel.app</span>. By creating
              an account or using the service, you agree to the practices
              described here.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>
              <span className="font-semibold text-white">Account information.</span>{" "}
              When you register, we collect your name, email address, and a
              password. Passwords are never stored in plain text - they are
              hashed before being saved.
            </p>
            <p>
              <span className="font-semibold text-white">
                Notification preferences.
              </span>{" "}
              Which contest platforms you follow, how far in advance you want to
              be reminded, and whether you've enabled email or calendar
              reminders.
            </p>
            <p>
              <span className="font-semibold text-white">
                Google Calendar authorization.
              </span>{" "}
              If you choose to connect Google Calendar, Google shares an access
              token and a refresh token with us so we can create events on your
              behalf. We never see or store your Google password.
            </p>
            <p>
              We do not use advertising or analytics trackers, and we do not
              collect any information beyond what's described above.
            </p>
          </Section>

          <Section title="How We Use Information">
            <ul className="list-disc space-y-2 pl-5">
              <li>To create and secure your account.</li>
              <li>
                To match upcoming contests (from public platform APIs such as
                LeetCode, Codeforces, CodeChef, and AtCoder) against your
                notification preferences.
              </li>
              <li>To send you reminder emails for contests you've opted into.</li>
              <li>
                If Google Calendar is connected, to automatically create a
                calendar event with a 30-minute reminder for each matching
                contest.
              </li>
            </ul>
          </Section>

          <Section title="Google Calendar Data">
            <p>
              ContestReminder requests the{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">
                https://www.googleapis.com/auth/calendar.events
              </code>{" "}
              scope. This scope only allows creating, viewing, and editing
              calendar events that ContestReminder itself creates - it does not
              give us access to your other calendars, Gmail, Drive, contacts, or
              any other Google data.
            </p>
            <p>
              We use this access solely to create one calendar event per
              contest that matches your notification preferences. We do not
              read, modify, or delete any other events already on your
              calendar. Access and refresh tokens are encrypted at rest and are
              only decrypted in memory at the moment we need to call Google's
              API on your behalf.
            </p>
            <p>
              You can disconnect Google Calendar at any time from your
              dashboard's Notification Preferences. Disconnecting immediately
              revokes ContestReminder's access and stops any future events from
              being created.
            </p>
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
              ContestReminder's use of information received from Google APIs
              will adhere to the Google API Services User Data Policy,
              including the Limited Use requirements.
            </p>
          </Section>

          <Section title="How We Share Information">
            <p>We do not sell your data, and we do not share it with advertisers or data brokers.</p>
            <p>
              We do not use any Google user data to train AI or machine
              learning models, to serve ads, or to make credit or lending
              decisions.
            </p>
            <p>
              We share data only with the infrastructure providers necessary
              to run the service - our database host, our email delivery
              provider, and Google's own Calendar API when you've connected
              it - and only to the extent needed to provide the features
              described above. We may also disclose information if required
              by law.
            </p>
          </Section>

          <Section title="Data Retention & Your Choices">
            <p>
              You can update your notification preferences at any time from
              your dashboard. Disconnecting Google Calendar deletes the stored
              Google tokens associated with your account. To request deletion
              of your account and associated data, contact us using the email
              below.
            </p>
          </Section>

          <Section title="Security">
            <p>
              Passwords are hashed before storage. Google Calendar tokens are
              encrypted at rest using AES-256-GCM and are never exposed through
              our API. All traffic to ContestReminder is served over HTTPS.
            </p>
          </Section>

          <Section title="Children's Privacy">
            <p>
              ContestReminder is not directed at children under 13, and we do
              not knowingly collect information from children under 13.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this policy from time to time. Material changes
              will be reflected on this page with an updated date, and if a
              change affects how we use Google user data, we will notify users
              and seek renewed consent as required.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy? Email{" "}
              <a
                href="mailto:sachineducational555@gmail.com"
                className="text-cyan-400 hover:underline"
              >
                sachineducational555@gmail.com
              </a>
              .
            </p>
          </Section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
