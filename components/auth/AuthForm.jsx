"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import AuthInput from "./AuthInput";

export default function AuthForm({ mode }) {
  const router = useRouter();

  const isLogin = mode === "login";

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();

    setLoading(true);

    setError("");

    const form = new FormData(e.currentTarget);

    const data = Object.fromEntries(form);

    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.message || "Something went wrong.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6"
    >
      {!isLogin && (
        <AuthInput
          label="Full Name"
          name="name"
          required
          autoComplete="name"
        />
      )}

      <AuthInput
        label="Email Address"
        name="email"
        type="email"
        required
        autoComplete="email"
      />

      <AuthInput
        label="Password"
        name="password"
        type="password"
        required
        minLength={8}
        autoComplete={
          isLogin
            ? "current-password"
            : "new-password"
        }
      />

      {/* Remember */}

      <div className="flex items-center justify-between">

        <label className="flex items-center gap-3 text-sm text-slate-400">

          <input
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 accent-cyan-500"
          />

          Remember me

        </label>

        {isLogin && (
          <Link
            href="#"
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            Forgot password?
          </Link>
        )}

      </div>

      {/* Error */}

      <AnimatePresence>

        {error && (

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300"
          >
            <AlertCircle
              className="mt-0.5"
              size={18}
            />

            <span className="text-sm">
              {error}
            </span>

          </motion.div>

        )}

      </AnimatePresence>

      {/* Button */}

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: .98,
        }}
        disabled={loading}
        className="
        flex
        h-14
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        font-semibold
        text-white
        shadow-lg
        shadow-cyan-500/20
        transition
        disabled:cursor-not-allowed
        disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />

            Please wait...
          </>
        ) : (
          <>
            <CheckCircle2 size={20} />

            {isLogin
              ? "Login"
              : "Create Account"}
          </>
        )}
      </motion.button>

      {/* Terms */}

      {!isLogin && (
        <p className="text-center text-xs leading-6 text-slate-500">
          By creating an account, you agree to our{" "}
          <Link
            href="#"
            className="text-cyan-400"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-cyan-400"
          >
            Privacy Policy
          </Link>
          .
        </p>
      )}
    </form>
  );
}