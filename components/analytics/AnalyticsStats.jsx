"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  CalendarDays,
  Clock3,
  Layers3,
} from "lucide-react";

import { SUPPORTED_PLATFORMS } from "@/utils/platforms";

function getLongestContest(contests) {
  if (!contests.length) return 0;

  return Math.max(
    ...contests.map((contest) => contest.duration || 0)
  );
}

function getAverageDuration(contests) {
  if (!contests.length) return 0;

  return Math.round(
    contests.reduce(
      (sum, contest) => sum + (contest.duration || 0),
      0
    ) /
      contests.length /
      60
  );
}

export default function AnalyticsStats({
  contests,
  analytics,
}) {
  const cards = [
    {
      title: "Upcoming Contests",
      value: contests.length,
      subtitle: "Across all platforms",
      icon: Trophy,
      color:
        "from-cyan-500 to-blue-600",
    },
    {
      title: "Today's Contests",
      value: analytics.todayCount,
      subtitle: "Starting today",
      icon: CalendarDays,
      color:
        "from-orange-500 to-yellow-500",
    },
    {
      title: "Platforms",
      value: SUPPORTED_PLATFORMS.length,
      subtitle: "Currently monitored",
      icon: Layers3,
      color:
        "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Avg Duration",
      value:
        getAverageDuration(contests) + " min",
      subtitle: `Longest ${Math.floor(
        getLongestContest(contests) / 3600
      )}h`,
      icon: Clock3,
      color:
        "from-emerald-500 to-green-600",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
            }}
            className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-3xl"
          >
            {/* Glow */}

            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
            />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color}`}
                >
                  <Icon size={24} />
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                  Live
                </span>

              </div>

              <h2 className="mt-8 text-4xl font-black">
                {card.value}
              </h2>

              <p className="mt-2 font-semibold">
                {card.title}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {card.subtitle}
              </p>

            </div>
          </motion.div>
        );
      })}
    </section>
  );
}