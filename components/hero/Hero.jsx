"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bell, CalendarDays, Clock3, Sparkles } from "lucide-react";
import CountUp from "react-countup";

const stats = [
  {
    value: 1200,
    suffix: "+",
    label: "Upcoming Contests",
  },
  {
    value: 10000,
    suffix: "+",
    label: "Email Reminders",
  },
  {
    value: 20,
    suffix: "+",
    label: "Platforms",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-130 w-130 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute left-1/2 top-40 h-130 w-130 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
          >
            <Sparkles size={15} />
            Smart Contest Reminder Platform
          </motion.div>

          {/* Heading */}

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Never Miss
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
              Another Coding
            </span>
            <br />
            Contest
          </h1>

          {/* Description */}

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            Receive elegant email reminders before every programming contest.
            Track LeetCode, Codeforces, AtCoder, CodeChef and many more from a
            single modern dashboard.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-semibold shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
            >
              Get Started
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 backdrop-blur transition-all hover:border-cyan-500"
            >
              Login
            </Link>
          </div>

          {/* Feature Cards */}

          <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
            <MiniCard icon={<Bell size={18} />} title="Email Alerts" />

            <MiniCard icon={<CalendarDays size={18} />} title="20+ Platforms" />

            <MiniCard icon={<Clock3 size={18} />} title="Auto Sync" />
          </div>

          {/* Stats */}
          {/* Stats */}

          <div className="mx-auto mt-14 grid w-full max-w-3xl gap-5 sm:grid-cols-3">
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.05]"
              >
                <h2 className="text-3xl font-black">
                  <CountUp end={item.value} duration={2.5} />
                  {item.suffix}
                </h2>

                <p className="mt-2 text-sm text-slate-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MiniCard({ icon, title }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.05]"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
        {icon}
      </div>

      <h3 className="font-medium text-white">{title}</h3>
    </motion.div>
  );
}
