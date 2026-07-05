"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  Bell,
  Calendar,
  Mail,
  Trophy,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Upcoming Contests",
    value: 1287,
    suffix: "+",
    icon: Calendar,
    color: "from-cyan-500 to-blue-500",
    progress: 88,
    change: "+12%",
  },
  {
    title: "Email Reminders",
    value: 10542,
    suffix: "+",
    icon: Mail,
    color: "from-violet-500 to-fuchsia-500",
    progress: 94,
    change: "+31%",
  },
  {
    title: "Supported Platforms",
    value: 20,
    suffix: "+",
    icon: Trophy,
    color: "from-orange-500 to-yellow-500",
    progress: 100,
    change: "+4",
  },
  {
    title: "Notifications Sent Today",
    value: 462,
    suffix: "",
    icon: Bell,
    color: "from-emerald-500 to-green-500",
    progress: 73,
    change: "+18%",
  },
];

export default function Stats() {
  return (
    <section className="relative py-28">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mb-16 text-center"
        >
          <p className="font-semibold text-cyan-400">
            LIVE PLATFORM METRICS
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Trusted by Competitive
            <br />
            Programmers
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            Monitor contests, schedule reminders,
            and receive timely notifications from
            every major coding platform.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              stat={stat}
              delay={index * .12}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

function StatCard({ stat, delay }) {
  const Icon = stat.icon;

  const circumference = 2 * Math.PI * 42;
  const offset =
    circumference - (stat.progress / 100) * circumference;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay,
        duration: .6,
      }}
      whileHover={{
        y: -8,
      }}
      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition"

    >

      {/* Glow */}

      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
      />

      {/* Header */}

      <div className="relative flex items-center justify-between">

        <div
          className={`rounded-2xl bg-gradient-to-br ${stat.color} p-4 shadow-lg`}
        >
          <Icon size={24} />
        </div>

        <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">

          <TrendingUp size={15} />

          {stat.change}

        </div>

      </div>

      {/* Number */}

      <div className="relative mt-8">

        <h2 className="text-5xl font-black">

          <CountUp
            end={stat.value}
            duration={3}
          />

          {stat.suffix}

        </h2>

        <p className="mt-3 text-slate-400">
          {stat.title}
        </p>

      </div>

      {/* Progress Ring */}

      <div className="relative mt-10 flex items-center justify-center">

        <svg
          width="120"
          height="120"
        >

          <circle
            cx="60"
            cy="60"
            r="42"
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
          />

          <motion.circle
            initial={{
              strokeDashoffset: circumference,
            }}
            whileInView={{
              strokeDashoffset: offset,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.5,
              delay,
            }}
            cx="60"
            cy="60"
            r="42"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
          />

          <defs>

            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#06b6d4"
              />

              <stop
                offset="100%"
                stopColor="#3b82f6"
              />
            </linearGradient>

          </defs>

        </svg>

        <div className="absolute text-center">

          <div className="text-2xl font-bold">
            {stat.progress}%
          </div>

          <div className="text-xs text-slate-500">
            Healthy
          </div>

        </div>

      </div>

      {/* Mini Graph */}

      <div className="mt-8 flex h-16 items-end justify-between">

        {[18, 34, 28, 46, 40, 60, 52, 74].map((height, i) => (

          <motion.div
            key={i}
            initial={{
              height: 0,
            }}
            whileInView={{
              height: `${height}%`,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: i * .06,
            }}
            className={`w-5 rounded-full bg-gradient-to-t ${stat.color}`}
          />

        ))}

      </div>

    </motion.div>
  );
}