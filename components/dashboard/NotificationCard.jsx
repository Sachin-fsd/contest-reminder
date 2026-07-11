"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, Calendar, Clock3, CheckCircle2, Loader2 } from "lucide-react";

import { SUPPORTED_PLATFORMS } from "@/utils/platforms";

const DEFAULT = {
  enabled: true,
  platforms: [],
  reminderBeforeHours: 24,
};

const DEFAULT_CALENDAR = {
  enabled: false,
  connected: false,
  reminderMinutesBeforeEvent: 30,
};

const REMINDER_OPTIONS = [24];
// const REMINDER_OPTIONS = [1, 2, 6, 12, 24, 48];

export default function NotificationCard({ initialPreferences, initialCalendarPreferences }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [preferences, setPreferences] = useState(initialPreferences || DEFAULT);

  const [saving, setSaving] = useState(false);

  const [status, setStatus] = useState("");

  const [calendarPrefs, setCalendarPrefs] = useState(initialCalendarPreferences || DEFAULT_CALENDAR);

  const [savingCalendar, setSavingCalendar] = useState(false);

  const [calendarStatus, setCalendarStatus] = useState("");

  useEffect(() => {
    if (initialPreferences) {
      setPreferences(initialPreferences);
    }
  }, [initialPreferences]);

  useEffect(() => {
    if (initialCalendarPreferences) {
      setCalendarPrefs(initialCalendarPreferences);
    }
  }, [initialCalendarPreferences]);

  // After the OAuth round trip, the callback route redirects back here as
  // /dashboard?calendar=connected (or ?calendar=error&reason=...). Surface a
  // message once, then strip the query params so a refresh doesn't repeat it.
  useEffect(() => {
    const calendarParam = searchParams.get("calendar");
    if (!calendarParam) return;

    if (calendarParam === "connected") {
      setCalendarPrefs((prev) => ({ ...prev, connected: true, enabled: true }));
      setCalendarStatus("Google Calendar connected.");
    } else if (calendarParam === "error") {
      setCalendarStatus("Couldn't connect Google Calendar. Please try again.");
    }

    router.replace("/dashboard");
  }, [searchParams, router]);

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

  async function toggleCalendarEnabled() {
    if (!calendarPrefs.connected) {
      window.location.href = "/api/auth/google";
      return;
    }

    const previous = calendarPrefs;
    const next = { ...calendarPrefs, enabled: !calendarPrefs.enabled };

    setCalendarPrefs(next);
    setSavingCalendar(true);
    setCalendarStatus("");

    try {
      const res = await fetch("/api/notification-preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calendar: { enabled: next.enabled } }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to save.");

      setCalendarPrefs(data.notificationPreferences.calendar);
    } catch (e) {
      setCalendarPrefs(previous);
      setCalendarStatus(e.message);
    } finally {
      setSavingCalendar(false);
    }
  }

  async function disconnectCalendar() {
    const confirmed = window.confirm(
      "Disconnect Google Calendar? Future contests won't be added automatically.",
    );
    if (!confirmed) return;

    setSavingCalendar(true);
    setCalendarStatus("");

    try {
      const res = await fetch("/api/auth/google/disconnect", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to disconnect.");

      setCalendarPrefs({ ...DEFAULT_CALENDAR });
      setCalendarStatus("Google Calendar disconnected.");
    } catch (e) {
      setCalendarStatus(e.message);
    } finally {
      setSavingCalendar(false);
    }
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

      {/* Google Calendar Sync */}

      <div className="mt-10 border-t border-white/10 pt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-cyan-400" />
            <h3 className="font-semibold">Google Calendar Sync</h3>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${calendarPrefs.connected
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-white/10 text-slate-400"
              }`}
          >
            {calendarPrefs.connected ? "Connected" : "Not connected"}
          </span>
        </div>

        <p className="mb-5 max-w-2xl text-sm text-slate-400">
          When enabled, each reminder above also creates an event on your
          Google Calendar with a {calendarPrefs.reminderMinutesBeforeEvent || 30}-minute
          popup reminder.
        </p>

        {calendarPrefs.connected ? (
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={toggleCalendarEnabled}
              disabled={savingCalendar}
              className={`relative h-12 w-24 rounded-full transition ${calendarPrefs.enabled ? "bg-cyan-500" : "bg-slate-700"
                }`}
            >
              <motion.div
                layout
                className="absolute top-1 h-10 w-10 rounded-full bg-white"
                style={{
                  left: calendarPrefs.enabled ? "52px" : "4px",
                }}
              />
            </button>

            <span className="text-sm text-slate-400">
              {calendarPrefs.enabled ? "Syncing to calendar" : "Calendar sync paused"}
            </span>

            <button
              onClick={disconnectCalendar}
              disabled={savingCalendar}
              className="ml-auto rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-red-500/50 hover:text-red-300"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <a
            href="/api/auth/google"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
          >
            <Calendar size={18} />
            Connect Google Calendar
          </a>
        )}

        {calendarStatus && (
          <p className="mt-4 text-sm text-blue-200">{calendarStatus}</p>
        )}
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
