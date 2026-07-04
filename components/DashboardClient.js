"use client";
import { useEffect, useState } from "react";
import ContestCard from "./ContestCard";
import Loader from "./Loader";
export default function DashboardClient() {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("/api/contests")
            .then((r) => r.json())
            .then((d) => setContests(d.contests || []))
            .finally(() => setLoading(false));
    }, []);
    if (loading) return <Loader />;
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {contests.map((c) => (
                <ContestCard
                    key={`${c.platform}-${c.title}-${c.startTime}`}
                    contest={c}
                />
            ))}
        </div>
    );
}
