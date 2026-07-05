"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const platforms = [
  {
    name: "LeetCode",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/leetcode.svg",
    color: "#FFA116",
  },
  {
    name: "Codeforces",
    logo: "https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000",
    color: "#1F8ACB",
  },
  {
    name: "AtCoder",
    logo: "https://img.atcoder.jp/assets/top/img/logo_bk.svg",
    color: "#000000",
  },
  {
    name: "CodeChef",
    logo: "/platforms/codechef.svg",
    color: "#5B4638",
  },
  {
    name: "HackerRank",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/hackerrank.svg",
    color: "#2EC866",
  },
  {
    name: "Kaggle",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/kaggle.svg",
    color: "#20BEFF",
  },
  {
    name: "NowCoder",
    logo: "https://www.nowcoder.com/favicon.ico",
    color: "#00C853",
  },
  {
    name: "TLX",
    logo: "https://tlx.toki.id/favicon.ico",
    color: "#2563EB",
  },
  {
    name: "Kattis",
    logo: "https://open.kattis.com/images/kattis.png",
    color: "#003D5B",
  },
  {
    name: "Code360",
    logo: "https://files.codingninjas.in/favicon.ico",
    color: "#FF6B00",
  },
  {
    name: "CTFTime",
    logo: "https://ctftime.org/static/images/favicon.png",
    color: "#0F172A",
  },
  {
    name: "Cups Online",
    logo: "https://cups.online/favicon.ico",
    color: "#DC2626",
  },
];

export default function PlatformStrip() {
  return (
    <section
      id="platforms"
      className="relative py-24"
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
          transition={{
            duration: .7,
          }}
          className="mb-14 text-center"
        >
          <p className="text-cyan-400 font-semibold">
            SUPPORTED PLATFORMS
          </p>

          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            One Dashboard.
            <br />
            Every Contest.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400 leading-8">
            Automatically sync contests from all major competitive
            programming platforms and receive reminders before
            they begin.
          </p>
        </motion.div>

      </div>

      <div className="relative">

        {/* Left Fade */}

        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-40 bg-gradient-to-r from-[#030712] to-transparent" />

        {/* Right Fade */}

        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-40 bg-gradient-to-l from-[#030712] to-transparent" />

        <Marquee
          speed={45}
          pauseOnHover
          gradient={false}
        >
          {platforms.concat(platforms).map((platform, index) => (
            <PlatformCard
              key={index}
              platform={platform}
            />
          ))}
        </Marquee>

      </div>

      {/* Bottom Text */}

      <div className="mx-auto mt-12 max-w-5xl text-center">

        <p className="text-lg text-slate-400">
          And many more platforms added regularly...
        </p>

      </div>

    </section>
  );
}

function PlatformCard({ platform }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.05,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="mx-5"
    >
      <div className="group flex h-36 w-56 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.07] hover:shadow-[0_0_60px_rgba(6,182,212,.18)]">

        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white"
          style={{
            boxShadow: `0 0 25px ${platform.color}40`,
          }}
        >
          <img
            src={platform.logo}
            alt={platform.name}
            className="h-10 w-10 object-contain"
          />
        </div>

        <h3 className="text-lg font-bold">
          {platform.name}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Contest Sync
        </p>

      </div>
    </motion.div>
  );
}