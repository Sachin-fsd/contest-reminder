"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Timer,
  ExternalLink,
  Trophy,
} from "lucide-react";

import { getPlatformMeta } from "@/utils/platforms";

function formatDuration(seconds) {
  if (!seconds) return "TBA";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
}

function getCountdown(startTime) {
  const diff = new Date(startTime).getTime() - Date.now();

  if (diff <= 0) {
    return {
      text: "LIVE",
      progress: 100,
      live: true,
    };
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const totalWindow = 7 * 24 * 3600000;
  const progress =
    Math.min(
      100,
      Math.max(
        0,
        ((totalWindow - diff) / totalWindow) * 100
      )
    );

  return {
    text: `${days}d ${hours}h ${mins}m ${secs}s`,
    progress,
    live: false,
  };
}

export default function ContestCard({ contest }) {
  const meta = getPlatformMeta(contest.platform);

  const [countdown, setCountdown] = useState(
    getCountdown(contest.startTime)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(
        getCountdown(contest.startTime)
      );
    }, 1000);

    return () => clearInterval(id);
  }, [contest.startTime]);

  const date = useMemo(
    () => new Date(contest.startTime),
    [contest.startTime]
  );

  return (
    <motion.article
      whileHover={{
        y: -8,
      }}
      className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.05] backdrop-blur-3xl"
    >
      {/* Top Gradient */}

      <div
        className={`h-2 bg-gradient-to-r ${meta.color}`}
      />

      <div className="p-6">

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex gap-4">

            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-white/10">

              {meta.logoPath ? (
                <img
                  src={meta.logoPath}
                  alt={meta.label}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              ) : (
                <span className="font-black">
                  {meta.logo}
                </span>
              )}

            </div>

            <div>

              <p className="text-sm text-slate-400">
                {meta.label}
              </p>

              <h2 className="mt-1 line-clamp-2 text-xl font-bold">
                {contest.title}
              </h2>

            </div>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              countdown.live
                ? "bg-red-500/20 text-red-300"
                : "bg-emerald-500/20 text-emerald-300"
            }`}
          >
            {countdown.live ? "LIVE" : "UPCOMING"}
          </span>

        </div>

        {/* Countdown */}

        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-5">

          <div className="mb-2 flex items-center gap-2 text-cyan-400">

            <Timer size={18} />

            <span className="font-medium">
              Starts In
            </span>

          </div>

          <h3 className="font-mono text-3xl font-black tracking-wide">
            {countdown.text}
          </h3>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

            <motion.div
              animate={{
                width: `${countdown.progress}%`,
              }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
            />

          </div>

        </div>

        {/* Details */}

        <div className="mt-6 grid grid-cols-2 gap-4">

          <Info
            icon={<CalendarDays size={18} />}
            title="Date"
            value={date.toLocaleDateString()}
          />

          <Info
            icon={<Clock3 size={18} />}
            title="Time"
            value={date.toLocaleTimeString()}
          />

          <Info
            icon={<Timer size={18} />}
            title="Duration"
            value={formatDuration(contest.duration)}
          />

          <Info
            icon={<Trophy size={18} />}
            title="Platform"
            value={meta.label}
          />

        </div>

        {/* CTA */}

        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
        >
          Register

          <ExternalLink size={18} />

        </a>

      </div>
    </motion.article>
  );
}

function Info({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">

      <div className="mb-2 flex items-center gap-2 text-cyan-400">

        {icon}

        <span className="text-xs uppercase tracking-wide">
          {title}
        </span>

      </div>

      <p className="font-semibold">
        {value}
      </p>

    </div>
  );
}