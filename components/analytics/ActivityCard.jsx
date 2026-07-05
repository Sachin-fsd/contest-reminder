"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  CalendarClock,
  Timer,
  BarChart3,
  TrendingUp,
} from "lucide-react";

import { getPlatformMeta } from "@/utils/platforms";

function longestContest(contests) {
  if (!contests.length) return null;

  return [...contests].sort(
    (a, b) => (b.duration || 0) - (a.duration || 0)
  )[0];
}

function contestsPerDay(contests) {
  if (!contests.length) return 0;

  const days = new Set(
    contests.map((contest) =>
      new Date(contest.startTime).toDateString()
    )
  );

  return (
    contests.length / Math.max(days.size, 1)
  ).toFixed(1);
}

function nextContest(contests) {
  if (!contests.length) return null;

  return contests[0];
}

export default function ActivityCard({
  contests,
}) {
  const longest = longestContest(contests);

  const next = nextContest(contests);

  const density = contestsPerDay(contests);

  const platform = next
    ? getPlatformMeta(next.platform)
    : null;

  return (
    <motion.section
      initial={{
        opacity: 0,
        x: 25,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-3xl"
    >
      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-cyan-500/15 p-3">

          <TrendingUp className="text-cyan-400" />

        </div>

        <div>

          <h2 className="text-2xl font-black">
            Insights
          </h2>

          <p className="text-sm text-slate-400">
            Live contest analytics
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        <Item
          icon={<CalendarClock size={20} />}
          title="Next Contest"
          value={
            next
              ? next.title
              : "No contest"
          }
        />

        <Item
          icon={<Trophy size={20} />}
          title="Platform"
          value={
            platform?.label || "--"
          }
        />

        <Item
          icon={<Timer size={20} />}
          title="Longest Contest"
          value={
            longest
              ? `${Math.floor(
                  longest.duration / 3600
                )}h`
              : "--"
          }
        />

        <Item
          icon={<BarChart3 size={20} />}
          title="Contests / Day"
          value={density}
        />

      </div>

      {/* Density */}

      <div className="mt-10">

        <div className="mb-3 flex items-center justify-between">

          <span className="text-sm text-slate-400">
            Contest Density
          </span>

          <span className="font-semibold">
            {Math.min(
              100,
              contests.length * 4
            )}
            %
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/10">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${Math.min(
                100,
                contests.length * 4
              )}%`,
            }}
            transition={{
              duration: 1,
            }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500"
          />

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <h3 className="font-bold">
          Quick Summary
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          You currently have{" "}
          <span className="font-bold text-cyan-400">
            {contests.length}
          </span>{" "}
          upcoming contests across multiple
          competitive programming platforms.
        </p>

      </div>

    </motion.section>
  );
}

function Item({
  icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4">

      <div className="flex items-center gap-3">

        <div className="text-cyan-400">
          {icon}
        </div>

        <span className="text-slate-400">
          {title}
        </span>

      </div>

      <span className="max-w-[150px] truncate text-right font-semibold">
        {value}
      </span>

    </div>
  );
}