"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  CalendarDays,
  Bell,
  Clock3,
  TrendingUp,
} from "lucide-react";
import { SUPPORTED_PLATFORMS } from "@/utils/platforms";

function getTodayCount(contests) {
  const today = new Date().toDateString();

  return contests.filter(
    (contest) =>
      new Date(contest.startTime).toDateString() === today
  ).length;
}

function getAverageHours(contests) {
  if (!contests.length) return "--";

  const total = contests.reduce((sum, contest) => {
    const hours =
      (new Date(contest.startTime).getTime() - Date.now()) /
      3600000;

    return sum + Math.max(hours, 0);
  }, 0);

  return Math.round(total / contests.length);
}

export default function DashboardStats({
  contests = [],
  preferences,
}) {
  const reminderPlatforms =
    preferences?.platforms?.length || 0;

  const stats = [
    {
      title: "Upcoming Contests",
      value: contests.length,
      icon: Trophy,
      color: "from-cyan-500 to-blue-600",
      subtitle: "Across all platforms",
    },
    {
      title: "Today's Contests",
      value: getTodayCount(contests),
      icon: CalendarDays,
      color: "from-orange-500 to-yellow-500",
      subtitle: "Starting today",
    },
    {
      title: "Reminder Platforms",
      value: reminderPlatforms,
      icon: Bell,
      color: "from-violet-500 to-fuchsia-500",
      subtitle: `${SUPPORTED_PLATFORMS.length} available`,
    },
    {
      title: "Average Wait",
      value: `${getAverageHours(contests)}h`,
      icon: Clock3,
      color: "from-emerald-500 to-green-600",
      subtitle: "Until contests",
    },
  ];

  return (
    <section className="mt-8">

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat, index) => {

          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{
                opacity: 0,
                y: 25,
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
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl"
            >

              {/* Glow */}

              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
              />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color}`}
                  >
                    <Icon size={24} />
                  </div>

                  <TrendingUp
                    size={18}
                    className="text-emerald-400"
                  />

                </div>

                <h2 className="mt-8 text-4xl font-black">

                  {stat.value}

                </h2>

                <p className="mt-2 font-semibold">

                  {stat.title}

                </p>

                <p className="mt-1 text-sm text-slate-400">

                  {stat.subtitle}

                </p>

              </div>

            </motion.div>
          );
        })}

      </div>

    </section>
  );
}