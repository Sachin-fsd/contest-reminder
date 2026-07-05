"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  Clock3,
  Trophy,
  CheckCircle2,
  Activity,
  Mail,
} from "lucide-react";

const contests = [
  {
    name: "LeetCode Weekly 512",
    color: "bg-yellow-500",
    time: "02:30 AM",
    countdown: "8h 42m",
  },
  {
    name: "Codeforces Round #1091",
    color: "bg-blue-500",
    time: "08:05 PM",
    countdown: "1d 3h",
  },
  {
    name: "AtCoder Beginner Contest",
    color: "bg-gray-400",
    time: "12:00 PM",
    countdown: "2d 8h",
  },
];

const activity = [30, 45, 40, 70, 55, 80, 60, 95];

export default function FloatingDashboard() {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative w-full max-w-xl"
    >
      {/* Glow */}

      <div className="absolute -inset-10 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] shadow-[0_0_80px_rgba(6,182,212,.15)] backdrop-blur-3xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

          <div>

            <p className="text-sm text-slate-400">
              Dashboard
            </p>

            <h2 className="text-xl font-bold">
              Contest Overview
            </h2>

          </div>

          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="rounded-xl bg-cyan-500/15 p-3"
          >
            <Bell className="text-cyan-400" />
          </motion.div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-4 p-6">

          <Stat
            title="Platforms"
            value="20+"
          />

          <Stat
            title="Upcoming"
            value="127"
          />

          <Stat
            title="Reminders"
            value="ON"
          />

        </div>

        {/* Contests */}

        <div className="space-y-4 px-6 pb-6">

          {contests.map((contest, index) => (

            <motion.div
              key={contest.name}
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * .15,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className={`h-3 w-3 rounded-full ${contest.color}`}
                  />

                  <div>

                    <h3 className="font-semibold">
                      {contest.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">

                      <Calendar size={14} />

                      {contest.time}

                    </div>

                  </div>

                </div>

                <div className="text-right">

                  <div className="font-bold text-cyan-400">
                    {contest.countdown}
                  </div>

                  <div className="text-xs text-slate-500">
                    remaining
                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

        {/* Graph */}

        <div className="border-t border-white/10 p-6">

          <div className="mb-5 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Activity
                size={18}
                className="text-cyan-400"
              />

              <h3 className="font-semibold">
                Reminder Activity
              </h3>

            </div>

            <span className="text-sm text-slate-500">
              Last 7 days
            </span>

          </div>

          <div className="flex h-28 items-end justify-between">

            {activity.map((value, index) => (

              <motion.div
                key={index}
                initial={{
                  height: 0,
                }}
                animate={{
                  height: `${value}%`,
                }}
                transition={{
                  delay: index * .1,
                  duration: .6,
                }}
                className="w-8 rounded-t-xl bg-gradient-to-t from-cyan-500 to-blue-500"
              />

            ))}

          </div>

        </div>

      </div>

      {/* Floating Card */}

      <motion.div
        animate={{
          y: [-8, 8, -8],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="absolute -left-10 top-20 rounded-2xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl"
      >

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-green-500/15 p-3">

            <CheckCircle2 className="text-green-400" />

          </div>

          <div>

            <p className="text-xs text-slate-400">
              Scheduled
            </p>

            <h3 className="font-semibold">
              48 Emails
            </h3>

          </div>

        </div>

      </motion.div>

      {/* Floating Card */}

      <motion.div
        animate={{
          y: [8, -8, 8],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute -right-10 bottom-16 rounded-2xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl"
      >

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-yellow-500/15 p-3">

            <Trophy className="text-yellow-400" />

          </div>

          <div>

            <p className="text-xs text-slate-400">
              Today's Contests
            </p>

            <h3 className="font-semibold">
              6 Live
            </h3>

          </div>

        </div>

      </motion.div>

      {/* Floating Card */}

      <motion.div
        animate={{
          rotate: [-2, 2, -2],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute right-20 -top-8 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 backdrop-blur-xl"
      >

        <div className="flex items-center gap-2">

          <Mail
            size={16}
            className="text-cyan-400"
          />

          <span className="text-sm">
            Reminder Sent
          </span>

        </div>

      </motion.div>
    </motion.div>
  );
}

function Stat({ title, value }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <p className="text-xs uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-black">
        {value}
      </h2>
    </motion.div>
  );
}