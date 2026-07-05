"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Clock3,
  Sparkles,
  Mail,
} from "lucide-react";
import CountUp from "react-countup";
import FloatingDashboard from "./FloatingDashboard";

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
    <section className="relative z-10 overflow-hidden pt-36 pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .8,
          }}
        >

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: .2,
            }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
          >
            <Sparkles size={16} />
            Smart Contest Reminder Platform
          </motion.div>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            Never Miss
            <br />
            Another

            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
              {" "}
              Coding Contest
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            Get beautiful email reminders before every coding contest.
            Track LeetCode, Codeforces, AtCoder, CodeChef and many more
            from one modern dashboard.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/register"
              className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 font-semibold shadow-xl shadow-blue-500/30 transition hover:scale-105"
            >
              Get Started

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 backdrop-blur transition hover:border-cyan-500"
            >
              Login
            </Link>

          </div>

          {/* QUICK FEATURES */}

          <div className="mt-12 grid gap-4 sm:grid-cols-3">

            <MiniCard
              icon={<Bell size={18} />}
              title="Email Alerts"
            />

            <MiniCard
              icon={<CalendarDays size={18} />}
              title="20+ Platforms"
            />

            <MiniCard
              icon={<Clock3 size={18} />}
              title="Auto Sync"
            />

          </div>

          {/* STATS */}

          <div className="mt-14 flex flex-wrap gap-10">

            {stats.map((item) => (

              <motion.div
                whileHover={{
                  y: -6,
                }}
                key={item.label}
              >

                <h2 className="text-4xl font-black">

                  <CountUp
                    end={item.value}
                    duration={3}
                  />

                  {item.suffix}

                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {item.label}
                </p>

              </motion.div>

            ))}

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: .2,
            duration: .8,
          }}
          className="relative flex justify-center"
        >

          <FloatingDashboard />

          {/* FLOATING BADGES */}

          <motion.div
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
            }}
            className="absolute -left-8 top-16 rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-5 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-cyan-500/20 p-3">
                <Bell className="text-cyan-400" />
              </div>

              <div>

                <p className="text-sm text-slate-400">
                  Next Reminder
                </p>

                <h3 className="font-semibold">
                  2h 15m
                </h3>

              </div>

            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [12, -12, 12],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
            }}
            className="absolute -right-10 bottom-20 rounded-2xl border border-violet-500/20 bg-slate-900/80 p-5 backdrop-blur-xl"
          >

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-violet-500/20 p-3">
                <Mail className="text-violet-400" />
              </div>

              <div>

                <p className="text-sm text-slate-400">
                  Sent Today
                </p>

                <h3 className="font-semibold">
                  426 Emails
                </h3>

              </div>

            </div>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

function MiniCard({ icon, title }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition hover:border-cyan-500/40"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
        {icon}
      </div>

      <h3 className="font-semibold">
        {title}
      </h3>
    </motion.div>
  );
}