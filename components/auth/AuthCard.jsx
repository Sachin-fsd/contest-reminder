"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  ArrowRight,
} from "lucide-react";

export default function AuthCard({
  mode,
  children,
}) {
  const isLogin = mode === "login";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
        scale: .96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: .6,
      }}
      className="relative mx-auto w-full max-w-lg"
    >
      {/* Glow */}

      <div className="absolute -inset-6 rounded-[40px] bg-cyan-500/20 blur-[80px]" />

      {/* Card */}

      <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.05] backdrop-blur-3xl">

        {/* Top Gradient */}

        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

        <div className="p-10">

          {/* Logo */}

          <motion.div
            animate={{
              rotate: [0, 6, -6, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
            }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/30"
          >
            <Bell size={34} />
          </motion.div>

          {/* Heading */}

          <h1 className="text-center text-4xl font-black">
            {isLogin
              ? "Welcome Back 👋"
              : "Create Account"}
          </h1>

          <p className="mt-4 text-center leading-7 text-slate-400">
            {isLogin
              ? "Continue your competitive programming journey."
              : "Start receiving contest reminders in minutes."}
          </p>

          {/* Social Login (UI only) */}

          {/* <div className="mt-10 grid gap-4">

            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-500"
            >
              <img src={"https://img.icons8.com/?size=100&id=63785&format=png&color=000000"} size={20} />

              Continue with Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-500"
            >
              <img src={"https://img.icons8.com/?size=100&id=12598&format=png&color=000000"} size={20} />

              Continue with GitHub
            </button>

          </div>


          <div className="my-10 flex items-center gap-4">

            <div className="h-px flex-1 bg-white/10" />

            <span className="text-sm text-slate-500">
              OR
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div> */}

          {/* Actual Form */}

          {children}

          {/* Bottom */}

          <div className="mt-10 text-center text-sm text-slate-400">

            {isLogin ? (
              <>
                Don't have an account?{" "}

                <Link
                  href="/register"
                  className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Register

                  <ArrowRight size={15} />

                </Link>

              </>
            ) : (
              <>
                Already have an account?{" "}

                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Login

                  <ArrowRight size={15} />

                </Link>

              </>
            )}

          </div>

        </div>

      </div>
    </motion.div>
  );
}