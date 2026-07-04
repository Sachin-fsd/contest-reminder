"use client";
import { motion } from "framer-motion";
import { getPlatformMeta } from "@/utils/contestUtils";
function formatDuration(seconds) {
    if (!seconds) return "TBA";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
}
function remaining(startTime) {
    const ms = new Date(startTime) - Date.now();
    if (ms <= 0) return "Starting now";
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return `${d}d ${h}h ${m}m`;
}
export default function ContestCard({ contest }) {
    const meta = getPlatformMeta(contest.platform);
    const date = new Date(contest.startTime);
    const hostLabel = meta.label || "Unknown Host";
    console.log({ meta }, contest)
    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass overflow-hidden rounded-3xl"
        >
            <div
                className={`h-2 bg-gradient-to-r ${meta.color || "from-blue-500 to-purple-500"}`}
            />
            <div className="p-6">
                <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-white/10">
                        {meta.logoPath ? (
                            <img
                                src={meta.logoPath}
                                alt={`${hostLabel} logo`}
                                className="h-8 w-8 object-contain"
                            />
                        ) : (
                            <span className="text-sm font-black text-white">{meta.logo}</span>
                        )}
                    </div>
                    <div className="min-w-0">
                        {/* <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Host</p> */}
                        <p className="text-sm font-semibold text-slate-200">{hostLabel}</p>
                        <h3 className="line-clamp-2 text-xl font-bold">{contest.title}</h3>
                    </div>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <dt className="text-slate-400">Date</dt>
                        <dd>{date.toLocaleDateString()}</dd>
                    </div>
                    <div>
                        <dt className="text-slate-400">Time</dt>
                        <dd>{date.toLocaleTimeString()}</dd>
                    </div>
                    <div>
                        <dt className="text-slate-400">Remaining</dt>
                        <dd>{remaining(contest.startTime)}</dd>
                    </div>
                    <div>
                        <dt className="text-slate-400">Duration</dt>
                        <dd>{formatDuration(contest.duration)}</dd>
                    </div>
                </dl>
                <a
                    href={contest.url}
                    target="_blank"
                    className="mt-6 block rounded-xl bg-white/10 p-3 text-center font-semibold hover:bg-white/20"
                >
                    Register
                </a>
            </div>
        </motion.article>
    );
}
