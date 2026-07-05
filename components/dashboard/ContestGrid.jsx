"use client";

import ContestCard from "./ContestCard";

export default function ContestGrid({ contests }) {
  if (!contests.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
        No upcoming contests found.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">Upcoming Contests</h2>
          <p className="mt-2 text-slate-400">
            {contests.length} contests found
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {contests.map((contest) => (
          <ContestCard
            key={`${contest.platform}-${contest.title}-${contest.startTime}`}
            contest={contest}
          />
        ))}
      </div>
    </section>
  );
}
