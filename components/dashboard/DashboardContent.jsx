"use client";

import { useEffect, useState } from "react";

import DashboardStats from "./DashboardStats";
// import ContestGrid from "./ContestGrid";
import Loader from "@/components/Loader";
import DashboardHero from "@/omponents/dashboard/DashboardHero";
import NotificationCard from "./NotificationCard";
import ContestGrid from "./ContestGrid";

export default function DashboardContent({ user }) {
  const [loading, setLoading] = useState(true);

  const [contests, setContests] = useState([]);

  const [preferences, setPreferences] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [contestRes, prefRes] = await Promise.all([
          fetch("/api/contests"),
          fetch("/api/notification-preferences"),
        ]);

        const contestData = await contestRes.json();
        const prefData = await prefRes.json();

        if (!active) return;

        setContests(contestData.contests || []);

        setPreferences(prefData.notificationPreferences?.email || null);
      } catch (err) {
        if (!active) return;

        setError("Unable to load dashboard.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHero user={user} contests={contests} />

      <DashboardStats contests={contests} preferences={preferences} />

      <NotificationCard initialPreferences={preferences} />

      <ContestGrid contests={contests} />
    </div>
  );
}
