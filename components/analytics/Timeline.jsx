"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  ExternalLink,
} from "lucide-react";

import { getPlatformMeta } from "@/utils/platforms";

function formatRemaining(startTime) {
  const diff =
    new Date(startTime).getTime() - Date.now();

  if (diff <= 0) return "Starting now";

  const days = Math.floor(diff / 86400000);

  const hours = Math.floor(
    (diff % 86400000) / 3600000
  );

  const mins = Math.floor(
    (diff % 3600000) / 60000
  );

  return `${days}d ${hours}h ${mins}m`;
}

export default function Timeline({
  contests,
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-3xl"
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Upcoming Timeline
          </h2>

          <p className="mt-2 text-slate-400">
            Next scheduled contests
          </p>

        </div>

        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          {contests.length} Events
        </span>

      </div>

      {/* Timeline */}

      <div className="relative mt-10">

        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent" />

        <div className="space-y-8">

          {contests.map((contest, index) => {

            const meta = getPlatformMeta(
              contest.platform
            );

            return (
              <motion.div
                key={`${contest.platform}-${contest.title}-${contest.startTime}`}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="relative flex gap-6"
              >

                {/* Timeline Dot */}

                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/40">

                  <CalendarDays size={20} />

                </div>

                {/* Card */}

                <div className="flex-1 rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-500">

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                    {/* Left */}

                    <div className="flex gap-4">

                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-900">

                        {meta.logoPath ? (
                          <img
                            src={meta.logoPath}
                            alt={meta.label}
                            width={34}
                            height={34}
                            className="object-contain"
                          />
                        ) : (
                          <span className="font-bold">
                            {meta.logo}
                          </span>
                        )}

                      </div>

                      <div>

                        <p className="text-sm text-slate-400">
                          {meta.label}
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                          {contest.title}
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">

                          <span className="flex items-center gap-2">

                            <CalendarDays size={16} />

                            {new Date(
                              contest.startTime
                            ).toLocaleDateString()}

                          </span>

                          <span className="flex items-center gap-2">

                            <Clock3 size={16} />

                            {new Date(
                              contest.startTime
                            ).toLocaleTimeString()}

                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Right */}

                    <div className="flex flex-col items-start gap-4 lg:items-end">

                      <div className="rounded-full bg-cyan-500/10 px-4 py-2 font-semibold text-cyan-300">

                        {formatRemaining(
                          contest.startTime
                        )}

                      </div>

                      <a
                        href={contest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 transition hover:border-cyan-500"
                      >
                        Open

                        <ExternalLink
                          size={16}
                        />

                      </a>

                    </div>

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

    </motion.section>
  );
}