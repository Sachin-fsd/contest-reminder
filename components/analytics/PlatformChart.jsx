"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BarChart3,
  Trophy,
} from "lucide-react";

import { getPlatformMeta } from "@/utils/platforms";

export default function PlatformChart({
  data,
}) {
  const total = data.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <motion.section
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-3xl"
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-500/15 p-4">

            <BarChart3 className="text-cyan-400" />

          </div>

          <div>

            <h2 className="text-2xl font-black">
              Platform Distribution
            </h2>

            <p className="text-sm text-slate-400">
              Contest availability by platform
            </p>

          </div>

        </div>

        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          {total} Total
        </span>

      </div>

      {/* Bars */}

      <div className="mt-10 space-y-6">

        {data.map((item, index) => {

          const meta = getPlatformMeta(
            item.platform
          );

          const percentage =
            total === 0
              ? 0
              : (item.count / total) * 100;

          return (
            <motion.div
              key={item.platform}
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
            >
              <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-900 ring-1 ring-white/10">

                    {meta.logoPath ? (
                      <img
                        src={meta.logoPath}
                        alt={meta.label}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    ) : (
                      <span className="font-bold">
                        {meta.logo}
                      </span>
                    )}

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {meta.label}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {percentage.toFixed(1)}%
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <h3 className="text-2xl font-black">
                    {item.count}
                  </h3>

                  <p className="text-xs text-slate-500">
                    contests
                  </p>

                </div>

              </div>

              {/* Progress */}

              <div className="h-4 overflow-hidden rounded-full bg-white/10">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${percentage}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${meta.color}`}
                />

              </div>

            </motion.div>
          );
        })}

      </div>

      {/* Summary */}

      <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <div className="flex items-center gap-3">

          <Trophy className="text-cyan-400" />

          <h3 className="font-bold">
            Most Active Platform
          </h3>

        </div>

        {data.length > 0 ? (
          <p className="mt-4 text-slate-300">

            <span className="font-bold text-cyan-400">
              {getPlatformMeta(data[0].platform).label}
            </span>{" "}
            currently has the highest number of
            upcoming contests with{" "}
            <span className="font-bold">
              {data[0].count}
            </span>{" "}
            scheduled events.

          </p>
        ) : (
          <p className="mt-4 text-slate-400">
            No contest data available.
          </p>
        )}

      </div>

    </motion.section>
  );
}