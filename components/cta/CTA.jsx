"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play, Check } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [-40, 40, -40],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute right-20 top-10 h-64 w-64 rounded-full bg-violet-500/10 blur-[120px]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-16 text-center backdrop-blur-2xl md:px-16"
        >
          {/* Badge */}

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            <Sparkles size={15} />
            Ready to Get Started?
          </div>

          {/* Heading */}

          <h2 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Never Miss
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
              Another Coding Contest
            </span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
            Join thousands of competitive programmers who receive beautiful
            email reminders before every contest across all major coding
            platforms.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
            >
              Create Free Account
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </Link>

            <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 transition-all hover:border-cyan-500 hover:bg-white/10">
              <Play size={17} />
              Live Demo
            </button>
          </div>

          {/* Small Text */}

          <p className="mt-5 text-sm text-slate-500">
            No credit card required • Free forever
          </p>

          {/* Feature Pills */}

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <FeaturePill text="100% Free Forever" />

            <FeaturePill text="20+ Coding Platforms" />

            <FeaturePill text="Email Reminders" />

            <FeaturePill text="Automatic Updates" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturePill({ text }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl transition-all hover:border-cyan-500/30 hover:bg-white/[0.05]"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10">
        <Check size={14} className="text-cyan-400" />
      </div>

      <span className="text-sm font-medium text-slate-300">{text}</span>
    </motion.div>
  );
}
