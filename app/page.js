import Link from "next/link";
import {
    Bell,
    Calendar,
    Mail,
    Shield,
    Clock,
    CheckCircle,
} from "lucide-react";

const platforms = [
    "LeetCode",
    "Codeforces",
    "CodeChef",
    "AtCoder",
    "HackerRank",
    "Kaggle",
];

export default function Home() {
    return (
        <main className="relative overflow-hidden bg-[#030712] text-white">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb30,transparent_45%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

            {/* Hero */}
            <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6">
                <div className="grid w-full gap-20 lg:grid-cols-2">
                    <div className="flex flex-col justify-center">
                        <span className="mb-5 w-fit rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                            Smart Coding Contest Reminders
                        </span>

                        <h1 className="text-5xl font-black leading-tight md:text-7xl">
                            Never miss
                            <br />
                            another
                            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                {" "}
                                coding contest
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
                            Track upcoming contests from all major competitive programming
                            platforms and receive beautiful email reminders before every
                            contest starts.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/register"
                                className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
                            >
                                Start Free
                            </Link>

                            <Link
                                href="/login"
                                className="rounded-xl border border-slate-700 px-8 py-4 transition hover:border-slate-500"
                            >
                                Login
                            </Link>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                            {platforms.map((platform) => (
                                <span
                                    key={platform}
                                    className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300"
                                >
                                    {platform}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="flex items-center justify-center">
                        <div className="glass w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold">Upcoming Contests</h3>
                                <Bell className="text-blue-400" />
                            </div>

                            {[
                                {
                                    name: "LeetCode Weekly 512",
                                    color: "bg-yellow-500",
                                    time: "Tomorrow • 2:30 AM",
                                },
                                {
                                    name: "Codeforces Round #1090",
                                    color: "bg-blue-500",
                                    time: "Jul 9 • 8:05 PM",
                                },
                                {
                                    name: "AtCoder Beginner Contest",
                                    color: "bg-zinc-500",
                                    time: "Jul 11 • 12:00 PM",
                                },
                            ].map((contest) => (
                                <div
                                    key={contest.name}
                                    className="mb-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`h-3 w-3 rounded-full ${contest.color}`}
                                        ></div>

                                        <div className="flex-1">
                                            <h4 className="font-semibold">{contest.name}</h4>
                                            <p className="text-sm text-slate-400">
                                                {contest.time}
                                            </p>
                                        </div>

                                        <CheckCircle className="text-green-400" size={18} />
                                    </div>
                                </div>
                            ))}

                            <div className="mt-6 rounded-xl bg-blue-600 p-4 text-center font-semibold">
                                ✓ Email reminder scheduled
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}

            <section className="mx-auto max-w-7xl px-6 py-24">
                <div className="mb-14 text-center">
                    <h2 className="text-4xl font-black">
                        Everything you need
                    </h2>

                    <p className="mt-4 text-slate-400">
                        Designed for competitive programmers.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <Feature
                        icon={<Bell />}
                        title="Smart Reminders"
                        desc="Receive email notifications before every contest."
                    />

                    <Feature
                        icon={<Calendar />}
                        title="All Platforms"
                        desc="LeetCode, Codeforces, AtCoder, CodeChef and many more."
                    />

                    <Feature
                        icon={<Clock />}
                        title="Automatic Updates"
                        desc="Contest schedules refresh automatically."
                    />

                    <Feature
                        icon={<Shield />}
                        title="Reliable Delivery"
                        desc="Scalable worker architecture ensures reminders arrive on time."
                    />
                </div>
            </section>

            {/* CTA */}

            <section className="mx-auto max-w-6xl px-6 pb-32">
                <div className="rounded-[40px] border border-blue-500/20 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 p-16 text-center backdrop-blur">
                    <Mail
                        className="mx-auto mb-6 text-blue-400"
                        size={52}
                    />

                    <h2 className="text-4xl font-black">
                        Ready to stop missing contests?
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-slate-300">
                        Join thousands of competitive programmers who never forget another
                        contest.
                    </p>

                    <Link
                        href="/register"
                        className="mt-10 inline-block rounded-xl bg-blue-600 px-10 py-4 font-bold transition hover:bg-blue-700"
                    >
                        Create Free Account
                    </Link>
                </div>
            </section>
        </main>
    );
}

function Feature({ icon, title, desc }) {
    return (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7 backdrop-blur">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
                {icon}
            </div>

            <h3 className="mb-3 text-xl font-bold">{title}</h3>

            <p className="text-sm leading-7 text-slate-400">
                {desc}
            </p>
        </div>
    );
}