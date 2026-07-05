"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  Mail,
  Clock3,
  Sparkles,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Never Miss a Contest",
    description:
      "Automatically receive reminders before every contest from your favorite coding platforms.",
    icon: Bell,
    gradient: "from-cyan-500 to-blue-600",
    large: true,
  },
  {
    title: "20+ Platforms",
    description:
      "LeetCode, Codeforces, AtCoder, CodeChef, HackerRank and many more.",
    icon: Calendar,
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    title: "Email Scheduling",
    description:
      "Reliable reminder delivery powered by background workers.",
    icon: Mail,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Live Sync",
    description:
      "Contest data updates automatically every hour.",
    icon: Clock3,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    title: "Modern Dashboard",
    description:
      "Track all upcoming contests from a single beautiful dashboard.",
    icon: BarChart3,
    gradient: "from-pink-500 to-rose-500",
    wide: true,
  },
  {
    title: "Fast & Secure",
    description:
      "Built with Next.js, scalable APIs and secure authentication.",
    icon: Shield,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    title: "Lightning Fast",
    description:
      "Optimized frontend with instant page loads.",
    icon: Zap,
    gradient: "from-yellow-400 to-orange-500",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-32"
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mb-16 text-center"
        >
          <p className="font-semibold text-cyan-400">
            FEATURES
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Everything You Need
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Built for competitive programmers with
            beautiful UI, reliable reminders and modern
            technology.
          </p>

        </motion.div>

        <div className="grid auto-rows-[250px] gap-6 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => (

            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />

          ))}

        </div>

      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

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
        delay: index * .08,
      }}
      whileHover={{
        y: -10,
      }}
      className={`
      group
      relative
      overflow-hidden
      rounded-[30px]
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-xl
      p-7
      transition

      ${feature.large ? "lg:col-span-2 lg:row-span-2" : ""}
      ${feature.wide ? "lg:col-span-2" : ""}
      `}
    >
      {/* Glow */}

      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
      />

      {/* Floating Orb */}

      <motion.div
        animate={{
          y: [-8, 8, -8],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${feature.gradient} opacity-30 blur-3xl`}
      />

      <div className="relative z-10 flex h-full flex-col">

        <div
          className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient}`}
        >
          <Icon size={28} />
        </div>

        <h3 className="text-2xl font-bold">
          {feature.title}
        </h3>

        <p className="mt-4 leading-7 text-slate-400">
          {feature.description}
        </p>

        {feature.large && (

          <div className="mt-auto">

            {/* Fake dashboard */}

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5">

              <div className="mb-5 flex items-center justify-between">

                <span className="font-semibold">
                  Upcoming Contests
                </span>

                <Sparkles className="text-cyan-400" />

              </div>

              <div className="space-y-3">

                {[
                  "LeetCode Weekly",
                  "Codeforces Round",
                  "AtCoder ABC",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl bg-white/5 p-3"
                  >
                    <span className="text-sm">
                      {item}
                    </span>

                    <span className="text-xs text-cyan-400">
                      Tomorrow
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

        {!feature.large && (

          <motion.div
            whileHover={{
              x: 5,
            }}
            className="mt-auto flex items-center gap-2 pt-6 font-semibold text-cyan-400"
          >

            Learn More

            <ArrowRight size={18} />

          </motion.div>

        )}

      </div>

    </motion.div>
  );
}