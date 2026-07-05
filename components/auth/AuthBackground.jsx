"use client";

import { motion } from "framer-motion";

const stars = Array.from({ length: 80 });

export default function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030712]">

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />

      {/* Aurora */}

      <motion.div
        animate={{
          x: [-120, 120, -120],
          y: [-60, 60, -60],
          rotate: [0, 180, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 24,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[150px]"
      />

      <motion.div
        animate={{
          x: [80, -100, 80],
          y: [20, -40, 20],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
        }}
        className="absolute -left-40 top-52 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [-80, 100, -80],
          y: [-30, 40, -30],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
        className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-violet-500/20 blur-[150px]"
      />

      {/* Light Beams */}

      <motion.div
        animate={{
          opacity: [.25, .8, .25],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute left-1/2 top-0 h-[600px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent"
      />

      <motion.div
        animate={{
          opacity: [.2, .5, .2],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute left-24 top-0 h-[450px] w-[1px] bg-gradient-to-b from-blue-500 to-transparent"
      />

      <motion.div
        animate={{
          opacity: [.2, .6, .2],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
        }}
        className="absolute right-24 top-0 h-[450px] w-[1px] bg-gradient-to-b from-violet-500 to-transparent"
      />

      {/* Stars */}

      {stars.map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * 5;
        const duration = 2 + Math.random() * 4;

        return (
          <motion.span
            key={i}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
            }}
            initial={{
              opacity: .2,
            }}
            animate={{
              opacity: [.2, 1, .2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              repeat: Infinity,
              delay,
              duration,
            }}
            className="absolute rounded-full bg-white"
          />
        );
      })}

      {/* Noise */}

      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      {/* Radial Overlay */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,.35)_55%,rgba(3,7,18,.95)_100%)]" />
    </div>
  );
}