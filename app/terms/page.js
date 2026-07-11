import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Terms of Service | ContestReminder",
  description: "The terms that govern your use of ContestReminder.",
};

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="mt-4 space-y-4 leading-7 text-slate-300">{children}</div>
    </section>
  );
}

export default function TermsPage() {
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

        <h1 className="mt-10 text-4xl font-black">Terms of Service</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: July 11, 2026</p>

        <div className="mt-10 space-y-10">
          <Section title="Acceptance of Terms">
            <p>
              By creating an account or using ContestReminder, you agree to
              these Terms. If you don't agree, please don't use the service.
            </p>
          </Section>

          <Section title="What ContestReminder Does">
            <p>
              ContestReminder aggregates upcoming contest schedules from
              public competitive-programming platforms (LeetCode, Codeforces,
              CodeChef, AtCoder, and others) and sends reminders by email and,
              optionally, as events on your Google Calendar.
            </p>
          </Section>

          <Section title="Your Account">
            <p>
              You're responsible for keeping your login credentials
              confidential and for the accuracy of the information you
              provide. One account per person, please.
            </p>
          </Section>

          <Section title="Acceptable Use">
            <p>
              Don't use ContestReminder to abuse, scrape, or overload the
              service, to send spam, or to impersonate someone else.
            </p>
          </Section>

          <Section title="Third-Party Contest Data">
            <p>
              Contest schedules come from third-party platforms we don't
              control. Timings, availability, or links may change or be
              delayed on their end. We do our best to keep reminders accurate,
              but you should always confirm details on the contest platform
              itself - ContestReminder isn't liable for a missed contest
              caused by inaccurate third-party data or a delivery failure.
            </p>
          </Section>

          <Section title="Connecting Your Google Account">
            <p>
              Connecting Google Calendar is optional and is also governed by
              Google's own Terms of Service. You can disconnect it at any time
              from your dashboard, which immediately stops future calendar
              events from being created.
            </p>
          </Section>

          <Section title="Termination">
            <p>
              You may stop using ContestReminder at any time. We may suspend
              or terminate accounts that violate these Terms.
            </p>
          </Section>

          <Section title="Disclaimer & Limitation of Liability">
            <p>
              ContestReminder is provided "as is," without warranties of any
              kind, including uninterrupted or error-free operation. To the
              extent permitted by law, ContestReminder isn't liable for
              indirect or consequential damages arising from your use of the
              service.
            </p>
          </Section>

          <Section title="Changes to These Terms">
            <p>
              We may update these Terms from time to time. Continued use of
              ContestReminder after a change means you accept the updated
              Terms.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms are governed by the laws of{" "}
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-slate-400">
                [India / new Delhi]
              </span>
              .
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these Terms? Email{" "}
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
