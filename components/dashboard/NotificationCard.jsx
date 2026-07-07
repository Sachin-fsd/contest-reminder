"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Clock3, CheckCircle2, Loader2 } from "lucide-react";

import { SUPPORTED_PLATFORMS } from "@/utils/platforms";

const DEFAULT = {
  enabled: true,
  platforms: [],
  reminderBeforeHours: 24,
};

const REMINDER_OPTIONS = [24];
// const REMINDER_OPTIONS = [1, 2, 6, 12, 24, 48];

export default function NotificationCard({ initialPreferences }) {
  const [preferences, setPreferences] = useState(initialPreferences || DEFAULT);

  const [saving, setSaving] = useState(false);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (initialPreferences) {
      setPreferences(initialPreferences);
    }
  }, [initialPreferences]);

  const selected = useMemo(
    () => new Set(preferences.platforms),
    [preferences.platforms],
  );

  async function save(next, previous = preferences) {
    setPreferences(next); // Optimistic UI update
    setSaving(true);
    setStatus("");

    try {
      const res = await fetch("/api/notification-preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: next,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to save.");
      }

      // Keep server version if needed
      setPreferences(data.notificationPreferences.email);

      setStatus("Preferences saved.");
    } catch (e) {
      // Rollback
      setPreferences(previous);
      setStatus(e.message);
    } finally {
      setSaving(false);
    }
  }

  function toggleEnabled() {
    const previous = preferences;

    save(
      {
        ...preferences,
        enabled: !preferences.enabled,
      },
      previous
    );
  }

  function togglePlatform(id) {
    const previous = preferences;

    const platforms = selected.has(id)
      ? preferences.platforms.filter((p) => p !== id)
      : [...preferences.platforms, id];

    const next = {
      ...preferences,
      platforms,
    };

    save(next, previous);
  }

  function toggleReminder(hour) {
    const reminders = preferences.reminderBeforeHours.includes(hour)
      ? preferences.reminderBeforeHours.filter((h) => h !== hour)
      : [...preferences.reminderBeforeHours, hour].sort((a, b) => b - a);

    save({
      ...preferences,
      reminderBeforeHours: reminders,
    });
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-[34px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-3xl"
    >
      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300">
            <Bell size={16} />
            Email Reminders
          </div>

          <h2 className="mt-5 text-3xl font-black">Notification Preferences</h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Choose which platforms should send reminder emails.
          </p>
        </div>

        {/* Toggle */}

        <button
          onClick={toggleEnabled}
          disabled={false}
          className={`relative h-12 w-24 rounded-full transition ${preferences.enabled ? "bg-cyan-500" : "bg-slate-700"
            }`}
        >
          <motion.div
            layout
            className="absolute top-1 h-10 w-10 rounded-full bg-white"
            style={{
              left: preferences.enabled ? "52px" : "4px",
            }}
          />
        </button>
      </div>

      {/* Reminder Time */}

      <div className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <Clock3 size={18} className="text-cyan-400" />

          <h3 className="font-semibold">Reminder Time</h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {REMINDER_OPTIONS.map((hour) => (
            <button
              key={hour}
              disabled={!preferences.enabled}
              // onClick={() => toggleReminder(hour)}
              className={`rounded-xl border px-5 py-3 transition
                ${preferences.reminderBeforeHours.includes(hour)
                  ? "border-cyan-500 bg-cyan-500/20"
                  : "border-white/10 bg-white/5"
                }`}
            >
              {hour}h
            </button>
          ))}
        </div>
      </div>

      {/* Platforms */}

      <div className="mt-10">
        <h3 className="mb-5 text-lg font-bold">Platforms</h3>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SUPPORTED_PLATFORMS.map((platform) => {
            const active = selected.has(platform.id);

            return (
              <motion.button
                whileHover={{
                  y: -3,
                }}
                key={platform.id}
                disabled={!preferences.enabled}
                onClick={() => togglePlatform(platform.id)}
                className={`flex items-center gap-4 rounded-2xl border p-4 transition

                  ${active
                    ? "border-cyan-500 bg-cyan-500/10"
                    : "border-white/10 bg-white/[0.04]"
                  }
                  `}
              >
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                  {platform.logo ? (
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <span className="font-bold">{platform.initials}</span>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <p className="font-semibold">{platform.name}</p>

                  <p className="text-xs text-slate-400">Reminder</p>
                </div>

                {active && <CheckCircle2 className="text-cyan-400" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="text-sm text-slate-400">
          {status || `${preferences.platforms.length} platforms selected`}
        </span>

        {saving && <Loader2 className="animate-spin text-cyan-400" />}
      </div>
    </motion.section>
  );
}
