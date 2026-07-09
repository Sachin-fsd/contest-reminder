"use client";

import { SUPPORTED_PLATFORMS } from "@/utils/platforms";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Trophy,
  ArrowRight,
  Bell,
  Sparkles,
} from "lucide-react";

function formatRemaining(startTime) {
  if (!startTime) return "No upcoming contest";

  const diff = new Date(startTime).getTime() - Date.now();

  if (diff <= 0) return "Starting now";

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);

  return `${days}d ${hours}h ${mins}m`;
}

export default function DashboardHero({
  user,
  contests = [],
}) {
  const nextContest = contests[0];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.05] backdrop-blur-3xl"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute left-20 bottom-0 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />

      </div>

      <div className="relative grid gap-12 p-10 lg:grid-cols-[1fr_330px]">

        {/* Left */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-300">

            <Sparkles size={16} />

            Welcome Back

          </div>

          <h1 className="mt-6 text-5xl font-black">

            Hi {user?.name},

            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">

              Ready for your next contest?

            </span>

          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">

            Stay focused on solving problems while we
            track every contest and send reminders
            before they begin.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 font-semibold shadow-xl shadow-cyan-500/20">

              <Bell size={18} />

              Reminder Settings

            </button>

            <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 transition hover:border-cyan-500">

              View Calendar

              <ArrowRight size={18} />

            </button>

          </div>

          {/* Stats */}

          <div className="mt-12 grid gap-5 sm:grid-cols-3">

            <Stat
              icon={<Trophy size={20} />}
              value={contests.length}
              label="Upcoming Contests"
            />

            <Stat
              icon={<CalendarDays size={20} />}
              value={SUPPORTED_PLATFORMS.length}
              label="Platforms"
            />

            <Stat
              icon={<Clock3 size={20} />}
              value="24/7"
              label="Monitoring"
            />

          </div>

        </div>

        {/* Right */}

        <motion.div
          animate={{
            y: [-8, 8, -8],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="rounded-[30px] border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl"
        >

          <div className="mb-8 flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Next Contest
              </p>

              <h3 className="mt-2 text-2xl font-bold">

                {nextContest?.title || "No Contest"}

              </h3>

            </div>

            <div className="rounded-2xl bg-cyan-500/10 p-4">

              <Trophy className="text-cyan-400" />

            </div>

          </div>

          <div className="space-y-5">

            <Info
              title="Platform"
              value={nextContest?.platform || "--"}
            />

            <Info
              title="Starts In"
              value={formatRemaining(nextContest?.startTime)}
            />

            <Info
              title="Date"
              value={
                nextContest
                  ? new Date(
                      nextContest.startTime
                    ).toLocaleString()
                  : "--"
              }
            />

          </div>

          <div className="mt-10">

            <a
              href={nextContest?.url || "#"}
              target="_blank"
              className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold"
            >

              Register Now

            </a>

          </div>

        </motion.div>

      </div>
    </motion.section>
  );
}

function Stat({
  icon,
  value,
  label,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <div className="mb-4 text-cyan-400">

        {icon}

      </div>

      <h3 className="text-3xl font-black">

        {value}

      </h3>

      <p className="mt-2 text-sm text-slate-400">

        {label}

      </p>

    </div>
  );
}

function Info({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <p className="mt-2 font-semibold">

        {value}

      </p>

    </div>
  );
}