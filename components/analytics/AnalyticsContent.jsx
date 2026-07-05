"use client";

import { useEffect, useMemo, useState } from "react";

import Loader from "@/components/Loader";

import AnalyticsHero from "./AnalyticsHero";
import AnalyticsStats from "./AnalyticsStats";
import PlatformChart from "./PlatformChart";
import Timeline from "./Timeline";
import ActivityCard from "./ActivityCard";

export default function AnalyticsContent({ user }) {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [contests, setContests] = useState([]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch("/api/contests");

        const data = await res.json();

        if (!active) return;

        setContests(data.contests || []);
      } catch (err) {
        if (!active) return;

        setError("Unable to load analytics.");
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

  const analytics = useMemo(() => {
    const today = new Date().toDateString();

    const platformCounts = {};

    let todayCount = 0;

    contests.forEach((contest) => {
      platformCounts[contest.platform] =
        (platformCounts[contest.platform] || 0) + 1;

      if (
        new Date(contest.startTime).toDateString() ===
        today
      ) {
        todayCount++;
      }
    });

    const platformData = Object.entries(platformCounts)
      .map(([platform, count]) => ({
        platform,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    const mostActive =
      platformData.length > 0
        ? platformData[0]
        : null;

    const upcoming = [...contests]
      .sort(
        (a, b) =>
          new Date(a.startTime) -
          new Date(b.startTime)
      )
      .slice(0, 8);

    const totalDuration = contests.reduce(
      (sum, contest) =>
        sum + (contest.duration || 0),
      0
    );

    const averageDuration =
      contests.length > 0
        ? Math.round(
            totalDuration /
              contests.length /
              60
          )
        : 0;

    return {
      upcoming,
      todayCount,
      platformData,
      mostActive,
      averageDuration,
    };
  }, [contests]);

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

      <AnalyticsHero
        user={user}
        contests={contests}
        analytics={analytics}
      />

      <AnalyticsStats
        contests={contests}
        analytics={analytics}
      />

      <div className="grid gap-8 xl:grid-cols-[1.2fr_.8fr]">

        <PlatformChart
          data={analytics.platformData}
        />

        <ActivityCard
          contests={contests}
        />

      </div>

      <Timeline
        contests={analytics.upcoming}
      />

    </div>
  );
}