"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react";

const icons = {
  email: Mail,
  password: Lock,
  name: User,
};

export default function AuthInput({
  label,
  name,
  type = "text",
  required = false,
  minLength,
  autoComplete,
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const Icon = icons[name] || User;

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <motion.div
      whileFocus={{ scale: 1.01 }}
      className="relative"
    >
      <div
        className={`
          group
          relative
          rounded-2xl
          border
          transition-all
          duration-300

          ${
            focused
              ? "border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,.2)]"
              : "border-white/10"
          }

          bg-white/[0.04]
          backdrop-blur-xl
        `}
      >
        {/* Icon */}

        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors">
          <Icon size={20} />
        </div>

        {/* Input */}

        <input
          name={name}
          type={inputType}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          placeholder=" "
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="
            peer
            h-16
            w-full
            rounded-2xl
            bg-transparent
            pl-14
            pr-14
            pt-5
            text-white
            outline-none
            placeholder-transparent
          "
        />

        {/* Floating Label */}

        <label
          className="
            pointer-events-none
            absolute
            left-14
            top-1/2
            -translate-y-1/2
            text-slate-500
            transition-all
            duration-200

            peer-focus:top-5
            peer-focus:text-xs
            peer-focus:text-cyan-400

            peer-[:not(:placeholder-shown)]:top-5
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:text-cyan-400
          "
        >
          {label}
        </label>

        {/* Password Toggle */}

        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-400"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}

        {/* Glow */}

        <motion.div
          animate={{
            opacity: focused ? 1 : 0,
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-violet-500/10"
        />
      </div>
    </motion.div>
  );
}