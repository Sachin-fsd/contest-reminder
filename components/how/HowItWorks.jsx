"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  Bell,
  Calendar,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    title: "Create Your Account",
    description:
      "Register in seconds and access your personal contest dashboard.",
    icon: UserPlus,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Choose Platforms",
    description:
      "Select LeetCode, Codeforces, AtCoder, CodeChef and every platform you follow.",
    icon: Calendar,
    color: "from-orange-500 to-yellow-500",
  },
  {
    title: "Configure Reminders",
    description:
      "Choose how many hours before a contest you want to receive an email.",
    icon: Bell,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Never Miss Again",
    description:
      "Relax while our background workers continuously monitor contests and send reminders.",
    icon: Mail,
    color: "from-emerald-500 to-green-600",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative py-32"
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="font-semibold text-cyan-400">
            HOW IT WORKS
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Four Simple Steps
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Get started in less than a minute and never worry about
            forgetting another contest.
          </p>
        </motion.div>

        <div className="relative">

          {/* Timeline */}

          <div className="absolute left-7 top-0 hidden h-full w-[3px] bg-gradient-to-b from-cyan-500 via-blue-500 to-violet-500 lg:block" />

          <div className="space-y-14">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -50 : 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: .6,
                    delay: index * .12,
                  }}
                  className="relative grid gap-10 lg:grid-cols-[90px_1fr]"
                >

                  {/* Left */}

                  <div className="relative flex justify-center">

                    <motion.div
                      whileHover={{
                        scale: 1.15,
                        rotate: 8,
                      }}
                      className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-2xl`}
                    >
                      <Icon size={30} />
                    </motion.div>

                  </div>

                  {/* Right */}

                  <motion.div
                    whileHover={{
                      y: -6,
                    }}
                    className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
                  >

                    {/* Glow */}

                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
                    />

                    <div className="relative">

                      <div className="mb-6 flex items-center justify-between">

                        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                          Step {index + 1}
                        </span>

                        <ArrowRight className="text-slate-500" />

                      </div>

                      <h3 className="text-3xl font-bold">
                        {step.title}
                      </h3>

                      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                        {step.description}
                      </p>

                      {/* Example Card */}

                      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5">

                        <div className="flex items-center justify-between">

                          <div>

                            <h4 className="font-semibold">
                              Example
                            </h4>

                            <p className="mt-1 text-sm text-slate-400">
                              What you'll see after this step.
                            </p>

                          </div>

                          <CheckCircle2 className="text-green-400" />

                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">

                          {index === 0 && (
                            <>
                              <Badge text="Google Login" />
                              <Badge text="GitHub Login" />
                              <Badge text="Dashboard Ready" />
                            </>
                          )}

                          {index === 1 && (
                            <>
                              <Badge text="LeetCode" />
                              <Badge text="Codeforces" />
                              <Badge text="AtCoder" />
                              <Badge text="CodeChef" />
                            </>
                          )}

                          {index === 2 && (
                            <>
                              <Badge text="24 Hours Before" />
                              <Badge text="2 Hours Before" />
                              <Badge text="30 Minutes Before" />
                            </>
                          )}

                          {index === 3 && (
                            <>
                              <Badge text="Email Sent" />
                              <Badge text="Contest Synced" />
                              <Badge text="You're Ready 🚀" />
                            </>
                          )}

                        </div>

                      </div>

                    </div>

                  </motion.div>

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}

function Badge({ text }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
      }}
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
    >
      {text}
    </motion.div>
  );
}