"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Trophy,
  CalendarDays,
  Clock3,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import { getPlatformMeta } from "@/utils/platforms";

export default function AnalyticsHero({
  user,
  contests,
  analytics,
}) {
  const mostActive = analytics.mostActive
    ? getPlatformMeta(analytics.mostActive.platform)
    : null;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.05] backdrop-blur-3xl"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/20 blur-[120px]" />

      </div>

      <div className="relative grid gap-12 p-10 xl:grid-cols-[1fr_360px]">

        {/* Left */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300">

            <Sparkles size={16} />

            Contest Analytics

          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight">

            Welcome back,

            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">

              {user?.name}

            </span>

          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">

            Monitor contest activity across every
            platform, discover trends, and prepare
            efficiently for upcoming competitions.

          </p>

          {/* Quick Numbers */}

          <div className="mt-10 grid gap-5 sm:grid-cols-3">

            <MiniCard
              icon={<Trophy size={20} />}
              value={contests.length}
              label="Upcoming"
            />

            <MiniCard
              icon={<CalendarDays size={20} />}
              value={analytics.todayCount}
              label="Today"
            />

            <MiniCard
              icon={<Clock3 size={20} />}
              value={`${analytics.averageDuration}m`}
              label="Avg Duration"
            />

          </div>

        </div>

        {/* Right */}

        <motion.div
          animate={{
            y: [-6, 6, -6],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
          }}
          className="rounded-[32px] border border-white/10 bg-slate-900/70 p-8 backdrop-blur-2xl"
        >

          <div className="mb-8 flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Most Active Platform
              </p>

              <h2 className="mt-2 text-3xl font-black">

                {mostActive?.label || "--"}

              </h2>

            </div>

            <div className="rounded-2xl bg-cyan-500/10 p-4">

              <TrendingUp className="text-cyan-400" />

            </div>

          </div>

          <div className="space-y-5">

            <Info
              label="Upcoming Contests"
              value={
                analytics.mostActive?.count || 0
              }
            />

            <Info
              label="Average Duration"
              value={`${analytics.averageDuration} min`}
            />

            <Info
              label="Tracked Platforms"
              value={analytics.platformData.length}
            />

          </div>

          <div className="mt-10 rounded-2xl bg-gradient-to-r from-cyan-500/15 to-blue-600/15 p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">

                  Platform Growth

                </p>

                <h3 className="mt-2 text-2xl font-black">

                  +18%

                </h3>

              </div>

              <ArrowUpRight className="text-emerald-400" />

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-400">

              Based on upcoming contest volume
              compared to last month.

            </p>

          </div>

        </motion.div>

      </div>
    </motion.section>
  );
}

function MiniCard({
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
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">

      <p className="text-sm text-slate-500">

        {label}

      </p>

      <p className="mt-2 text-lg font-semibold">

        {value}

      </p>

    </div>
  );
}