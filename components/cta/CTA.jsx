"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Calendar,
  Mail,
  Sparkles,
  Play,
  ShieldCheck,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-32">

      {/* Background Glow */}

      <div className="absolute inset-0">

        <motion.div
          animate={{
            x: [-120, 120, -120],
            y: [-60, 60, -60],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[140px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute right-20 top-10 h-64 w-64 rounded-full bg-violet-500/20 blur-[120px]"
        />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.05] backdrop-blur-3xl"
        >

          <div className="grid gap-14 lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-12 lg:p-16">

              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-300">

                <Sparkles size={16} />

                Ready to Get Started?

              </div>

              <h2 className="text-5xl font-black leading-tight">

                Never Forget
                <br />

                Another Contest.

              </h2>

              <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

                Join thousands of competitive programmers who
                receive timely reminders before every contest.

              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <Link
                  href="/register"
                  className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold shadow-xl shadow-cyan-500/25 transition hover:scale-105"
                >

                  Create Free Account

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />

                </Link>

                <button
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 transition hover:border-cyan-500"
                >

                  <Play size={18} />

                  Live Demo

                </button>

              </div>

              {/* Trust */}

              <div className="mt-12 flex flex-wrap gap-8">

                <Trust
                  value="100%"
                  title="Free"
                />

                <Trust
                  value="20+"
                  title="Platforms"
                />

                <Trust
                  value="24/7"
                  title="Monitoring"
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="relative flex items-center justify-center p-12">

              {/* Floating Card */}

              <motion.div
                animate={{
                  y: [-12, 12, -12],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                }}
                className="relative w-full max-w-md rounded-[30px] border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl"
              >

                <div className="mb-8 flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-500">
                      Next Reminder
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      LeetCode Weekly
                    </h3>

                  </div>

                  <Bell className="text-cyan-400" />

                </div>

                <div className="space-y-5">

                  <Item
                    icon={<Calendar size={18} />}
                    text="Tomorrow • 2:30 AM"
                  />

                  <Item
                    icon={<Mail size={18} />}
                    text="Email Scheduled"
                  />

                  <Item
                    icon={<ShieldCheck size={18} />}
                    text="Delivery Guaranteed"
                  />

                </div>

                <motion.div
                  animate={{
                    width: ["20%", "100%", "20%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                  }}
                  className="mt-10 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                />

                <div className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-5 text-center font-bold">

                  Reminder Scheduled Successfully ✓

                </div>

              </motion.div>

              {/* Floating Bubble */}

              <motion.div
                animate={{
                  y: [10, -10, 10],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="absolute left-0 top-10 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
              >

                <Bell className="text-cyan-400" />

              </motion.div>

              <motion.div
                animate={{
                  y: [-8, 8, -8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                }}
                className="absolute bottom-10 right-0 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl"
              >

                <Sparkles className="text-violet-400" />

              </motion.div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

function Trust({ value, title }) {
  return (
    <div>
      <h3 className="text-3xl font-black">
        {value}
      </h3>

      <p className="mt-2 text-slate-400">
        {title}
      </p>
    </div>
  );
}

function Item({ icon, text }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4">

      <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">

        {icon}

      </div>

      <span>{text}</span>

    </div>
  );
}