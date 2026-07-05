"use client";

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Quote, Star, Trophy, Medal } from "lucide-react";

const testimonials = [
  {
    name: "Aman Sharma",
    role: "Codeforces Candidate Master",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    icon: Trophy,
    review:
      "This app completely solved my biggest problem. I never forget Codeforces or AtCoder contests anymore.",
  },
  {
    name: "Priya Verma",
    role: "LeetCode Knight",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    icon: Medal,
    review:
      "The dashboard looks incredible and the reminders always arrive on time. I use it every week.",
  },
  {
    name: "Rahul Singh",
    role: "ICPC Regionalist",
    image: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    icon: Trophy,
    review:
      "Exactly what competitive programmers needed. One place for every contest.",
  },
  {
    name: "Sarah Kim",
    role: "AtCoder Blue",
    image: "https://i.pravatar.cc/150?img=48",
    rating: 5,
    icon: Medal,
    review:
      "The animations are gorgeous, but the best part is the reliability of reminders.",
  },
  {
    name: "Alex Johnson",
    role: "Google Kick Start Finalist",
    image: "https://i.pravatar.cc/150?img=22",
    rating: 5,
    icon: Trophy,
    review:
      "This honestly feels like a premium SaaS. Beautiful interface and genuinely useful.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >

          <p className="font-semibold text-cyan-400">
            TRUSTED BY PROGRAMMERS
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Loved by Competitive
            <br />
            Programmers
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Thousands of programmers use Contest Reminder
            to stay ahead of every competition.
          </p>

        </motion.div>

      </div>

      <Marquee
        speed={45}
        pauseOnHover
        gradient={false}
      >
        {testimonials.concat(testimonials).map((person, index) => (
          <TestimonialCard
            key={index}
            person={person}
          />
        ))}
      </Marquee>

      {/* Bottom Stats */}

      <div className="mx-auto mt-20 max-w-6xl px-6">

        <div className="grid gap-8 rounded-[30px] border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl md:grid-cols-3">

          <MiniStat
            value="4.9/5"
            title="Average Rating"
          />

          <MiniStat
            value="10K+"
            title="Happy Developers"
          />

          <MiniStat
            value="99.98%"
            title="Reminder Delivery"
          />

        </div>

      </div>

    </section>
  );
}

function TestimonialCard({ person }) {
  const Icon = person.icon;

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="mx-5 w-[420px] rounded-[30px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl"
    >

      <Quote
        size={36}
        className="mb-6 text-cyan-400"
      />

      <p className="leading-8 text-slate-300">
        "{person.review}"
      </p>

      <div className="mt-8 flex">

        {Array.from({
          length: person.rating,
        }).map((_, i) => (
          <Star
            key={i}
            size={18}
            fill="#FACC15"
            className="text-yellow-400"
          />
        ))}

      </div>

      <div className="mt-8 flex items-center gap-4">

        <img
          src={person.image}
          alt={person.name}
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>

          <h3 className="font-bold">
            {person.name}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">

            <Icon
              size={16}
              className="text-cyan-400"
            />

            {person.role}

          </div>

        </div>

      </div>

    </motion.div>
  );
}

function MiniStat({ value, title }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
      }}
      className="text-center"
    >

      <h3 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        {value}
      </h3>

      <p className="mt-3 text-slate-400">
        {title}
      </p>

    </motion.div>
  );
}