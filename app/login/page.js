import AuthBackground from "@/components/auth/AuthBackground";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
    title: "Login | ContestReminder",
    description: "Login to your ContestReminder account",
};

export default function LoginPage() {
    return (
        <>
            <AuthBackground />

            <main className="relative min-h-screen overflow-hidden">

                {/* Back to Home */}

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

                {/* Main */}

                <div className="container mx-auto flex min-h-screen items-center justify-center px-6 py-16">

                    <div className="grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">

                        {/* Left Side */}

                        <div className="hidden lg:block">

                            <div className="max-w-xl">

                                <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300">
                                    Welcome Back
                                </span>

                                <h1 className="mt-8 text-6xl font-black leading-tight">

                                    Continue Your

                                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">

                                        Competitive Programming Journey

                                    </span>

                                </h1>

                                <p className="mt-8 text-lg leading-8 text-slate-400">

                                    Login to your account and never miss
                                    another coding contest again.

                                </p>

                                <div className="mt-10 space-y-6">

                                    <Feature text="Contest reminders from 20+ platforms" />

                                    <Feature text="Beautiful personalized dashboard" />

                                    <Feature text="Reliable email notifications" />

                                    <Feature text="Google Calendar sync (Coming Soon)" />

                                </div>

                            </div>

                        </div>

                        {/* Right */}

                        <div className="flex justify-center">

                            <AuthCard mode="login">

                                <AuthForm mode="login" />

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

            <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#06b6d4]" />

            <span className="text-slate-300">
                {text}
            </span>

        </div>
    );
}