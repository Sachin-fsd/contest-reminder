"use client";

import { useEffect, useMemo, useState } from "react";
import { SUPPORTED_PLATFORMS } from "@/utils/platforms";

const DEFAULT_EMAIL_PREFERENCES = {
  enabled: true,
  platforms: [],
  reminderBeforeHours: 24,
};

export default function NotificationPreferencesCard() {
  const [emailPreferences, setEmailPreferences] = useState(DEFAULT_EMAIL_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  const selectedPlatforms = useMemo(
    () => new Set(emailPreferences.platforms || []),
    [emailPreferences.platforms],
  );

  useEffect(() => {
    setHasMounted(true);

    let isActive = true;
    fetch("/api/notification-preferences")
      .then((response) => response.json())
      .then((data) => {

        if (isActive && data.notificationPreferences?.email) {
          setEmailPreferences({
            ...data.notificationPreferences.email,
            platforms: data.notificationPreferences.email.platforms || DEFAULT_EMAIL_PREFERENCES.platforms,
          });
        }
      })
      .catch(() => {
        if (isActive) setStatus("Unable to load notification preferences.");
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  async function savePreferences(nextEmailPreferences) {
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/notification-preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nextEmailPreferences }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to save preferences");
      setEmailPreferences(data.notificationPreferences.email);
      setStatus("Notification preferences saved.");
    } catch (error) {
      setStatus(error.message || "Unable to save notification preferences.");
    } finally {
      setSaving(false);
    }
  }

  function updateEnabled(enabled) {
    savePreferences({ ...emailPreferences, enabled });
  }

  function updatePlatform(platformId, checked) {
    const platforms = checked
      ? [...selectedPlatforms, platformId]
      : emailPreferences.platforms.filter((id) => id !== platformId);

    savePreferences({ ...emailPreferences, platforms });
  }

  if (!hasMounted) {
    return (
      <aside className="glass mb-6 rounded-3xl p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="h-6 w-48 rounded bg-white/10" />
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-10 w-40 rounded bg-white/10" />
        </div>
      </aside>
    );
  }

  return (
    <aside className="glass mb-6 rounded-3xl p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            Email reminders
          </p>
          <h3 className="mt-2 text-2xl font-black">Notification Preferences</h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Choose which platforms should generate reminder emails. These settings do not filter the dashboard contests.
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 font-semibold">
          <input
            type="checkbox"
            className="h-5 w-5 accent-blue-500"
            checked={Boolean(emailPreferences.enabled)}
            disabled={loading || saving}
            onChange={(event) => updateEnabled(event.target.checked)}
          />
          {emailPreferences.enabled ? "Enabled" : "Disabled"}
        </label>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SUPPORTED_PLATFORMS.map((platform) => (
          <label
            key={platform.id}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4"
          >
            <input
              type="checkbox"
              className="h-5 w-5 accent-blue-500"
              checked={selectedPlatforms.has(platform.id)}
              disabled={loading || saving || !emailPreferences.enabled}
              onChange={(event) => updatePlatform(platform.id, event.target.checked)}
            />
            <span className="grid h-9 w-9 place-items-center rounded-xl text-sm font-black" style={{ backgroundColor: platform.color }}>
              {platform.initials}
            </span>
            <span className="font-semibold">{platform.name}</span>
          </label>
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-400">
        Reminder timing: {emailPreferences.reminderBeforeHours} hours before each selected contest.
      </p>
      {status && <p className="mt-3 text-sm text-blue-200">{status}</p>}
    </aside>
  );
}
