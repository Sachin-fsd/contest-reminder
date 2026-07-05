import AuthBackground from "@/components/auth/AuthBackground";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
    title: "Register | ContestReminder",
    description: "Create your ContestReminder account",
};

export default function RegisterPage() {
    return (
        <>
            <AuthBackground />

            <main className="relative min-h-screen overflow-hidden">

                {/* Back Button */}

                <div className="absolute left-6 top-6 z-20">

                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl transition hover:border-cyan-500"
                    >
                        <ChevronLeft
                            size={18}
                            className="transition group-hover:-translate-x-1"
                        />

                        Home
                    </Link>

                </div>

                {/* Content */}

                <div className="container mx-auto flex min-h-screen items-center justify-center px-6 py-16">

                    <div className="grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">

                        {/* Left */}

                        <div className="hidden lg:block">

                            <div className="max-w-xl">

                                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2 text-sm font-medium text-green-300">
                                    Join Thousands of Programmers
                                </span>

                                <h1 className="mt-8 text-6xl font-black leading-tight">

                                    Create Your

                                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">

                                        ContestReminder Account

                                    </span>

                                </h1>

                                <p className="mt-8 text-lg leading-8 text-slate-400">

                                    Start receiving timely reminders before every
                                    coding contest. Stay organized, stay prepared,
                                    and focus on solving problems.

                                </p>

                                <div className="mt-10 space-y-6">

                                    <Feature text="Free forever for core features" />

                                    <Feature text="Track contests from 20+ platforms" />

                                    <Feature text="Beautiful personal dashboard" />

                                    <Feature text="Smart email reminders" />

                                    <Feature text="Google Calendar integration coming soon" />

                                </div>

                            </div>

                        </div>

                        {/* Right */}

                        <div className="flex justify-center">

                            <AuthCard mode="register">

                                <AuthForm mode="register" />

                            </AuthCard>

                        </div>

                    </div>

                </div>

            </main>
        </>
    );
}

function Feature({ text }) {
    return (
        <div className="flex items-center gap-4">

            <div className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]" />

            <span className="text-slate-300">
                {text}
            </span>

        </div>
    );
}