"use client";

import { motion } from "framer-motion";

const stars = Array.from({ length: 80 });

export default function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />

      {/* Top Aurora */}

      <motion.div
        animate={{
          x: [0, 120, -120, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
        className="absolute -top-72 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[140px]"
      />

      {/* Blue Blob */}

      <motion.div
        animate={{
          x: [-50, 100, -80],
          y: [50, -70, 30],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
        }}
        className="absolute top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[130px]"
      />

      {/* Purple Blob */}

      <motion.div
        animate={{
          x: [40, -100, 20],
          y: [-20, 60, -20],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 16,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 h-[550px] w-[550px] rounded-full bg-violet-500/20 blur-[150px]"
      />

      {/* Cyan Blob */}

      <motion.div
        animate={{
          y: [-40, 50, -20],
          x: [30, -40, 30],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-1/3 h-[350px] w-[350px] rounded-full bg-cyan-400/20 blur-[120px]"
      />

      {/* Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb25,transparent_45%)]" />

      {/* Stars */}

      {stars.map((_, i) => {

        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 4;
        const duration = 2 + Math.random() * 3;
        const size = Math.random() * 3 + 1;

        return (
          <motion.span
            key={i}
            initial={{
              opacity: .2,
            }}
            animate={{
              opacity: [.2, 1, .2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              repeat: Infinity,
              duration,
              delay,
            }}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
            }}
            className="absolute rounded-full bg-white"
          />
        );

      })}

      {/* Top Beam */}

      <motion.div
        animate={{
          opacity: [.3, .7, .3],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute left-1/2 top-0 h-[600px] w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent"
      />

      {/* Left Beam */}

      <motion.div
        animate={{
          opacity: [.2, .5, .2],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute left-20 top-0 h-[500px] w-[1px] bg-gradient-to-b from-blue-500 to-transparent"
      />

      {/* Right Beam */}

      <motion.div
        animate={{
          opacity: [.2, .6, .2],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="absolute right-32 top-0 h-[500px] w-[1px] bg-gradient-to-b from-violet-500 to-transparent"
      />

      {/* Noise */}

      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      {/* Fade */}

      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-b from-transparent to-[#030712]" />

    </div>
  );
}