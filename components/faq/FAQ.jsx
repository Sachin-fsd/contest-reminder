"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Which coding platforms are supported?",
    answer:
      "We currently support LeetCode, Codeforces, AtCoder, CodeChef, HackerRank, Kaggle, TLX, Kattis, Code360, NowCoder and many more. New platforms are added regularly.",
  },
  {
    question: "How do email reminders work?",
    answer:
      "Our scheduler continuously checks upcoming contests. Based on your reminder preferences, emails are automatically sent before each contest starts.",
  },
  {
    question: "Can I choose when reminders are sent?",
    answer:
      "Yes. You can configure multiple reminder intervals like 24 hours, 6 hours, 2 hours, or 30 minutes before a contest.",
  },
  {
    question: "Will I receive duplicate emails?",
    answer:
      "No. Every reminder is tracked internally so duplicate notifications are prevented even if schedules are updated.",
  },
  {
    question: "Is Contest Reminder free?",
    answer:
      "Yes. The core features are completely free. Premium features such as calendar sync, Discord notifications and advanced analytics may be introduced later.",
  },
  {
    question: "Will Google Calendar integration be available?",
    answer:
      "Yes. Upcoming contests will be synced directly to your Google Calendar with one click.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      className="relative py-32"
    >
      <div className="mx-auto max-w-5xl px-6">

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
          className="mb-16 text-center"
        >
          <HelpCircle
            size={48}
            className="mx-auto mb-6 text-cyan-400"
          />

          <p className="font-semibold text-cyan-400">
            FREQUENTLY ASKED QUESTIONS
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Everything You Need to Know
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Answers to the most common questions about Contest Reminder.
          </p>
        </motion.div>

        <div className="space-y-5">

          {faqs.map((faq, index) => {

            const isOpen = open === index;

            return (
              <motion.div
                key={faq.question}
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
                transition={{
                  delay: index * 0.08,
                }}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl"
              >
                <button
                  onClick={() =>
                    setOpen(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between p-8 text-left"
                >
                  <h3 className="text-xl font-bold">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="rounded-xl bg-cyan-500/10 p-2"
                  >
                    {isOpen ? (
                      <Minus className="text-cyan-400" />
                    ) : (
                      <Plus className="text-cyan-400" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>

                  {isOpen && (

                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: .35,
                      }}
                    >
                      <div className="border-t border-white/10 px-8 pb-8 pt-6">

                        <p className="leading-8 text-slate-400">
                          {faq.answer}
                        </p>

                      </div>
                    </motion.div>

                  )}

                </AnimatePresence>

              </motion.div>
            );

          })}

        </div>

      </div>
    </section>
  );
}