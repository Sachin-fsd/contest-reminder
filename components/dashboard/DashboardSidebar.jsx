"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Trophy,
  Bell,
  CalendarDays,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { SUPPORTED_PLATFORMS } from "@/utils/platforms";

const menu = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    id: "calendar",
    label: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    id: "notifications",
    label: "Notifications",
    href: "/dashboard",
    icon: Bell,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar({ active = "dashboard" }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        hidden
        lg:flex
        sticky
        top-24
        h-[calc(100vh-7rem)]
        flex-col
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-3xl
        transition-all
        duration-300

        ${collapsed ? "w-24" : "w-80"}
      `}
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 p-6">
        {!collapsed && (
          <div>
            <p className="text-xs uppercase tracking-[.25em] text-cyan-400">
              Navigation
            </p>

            <h2 className="mt-2 text-xl font-black">Dashboard</h2>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 transition hover:border-cyan-500"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}

      <div className="space-y-2 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.label} href={item.href}>
              <motion.div
                whileHover={{
                  x: 5,
                }}
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-4
                  py-4
                  transition

                  ${
                    item.id === active
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30"
                      : "hover:bg-white/5"
                  }
                `}
              >
                <Icon
                  size={22}
                  className={item.id === active ? "text-cyan-400" : "text-slate-400"}
                />

                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Divider */}

      <div className="mx-6 my-2 h-px bg-white/10" />

      {/* Platforms */}

      {!collapsed && (
        <>
          <div className="px-6 pt-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Platforms
            </h3>

            <div className="space-y-3">
              {SUPPORTED_PLATFORMS.map((platform) => (
                <motion.div
                  whileHover={{
                    x: 5,
                  }}
                  key={platform.id}
                  className="flex items-center justify-between rounded-2xl bg-white/5 p-3 transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                      style={{
                        background: platform.color,
                      }}
                    >
                      {platform.initials}
                    </div>

                    <span className="font-medium">{platform.name}</span>
                  </div>

                  <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">
                    Live
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-auto p-6">
            <div className="rounded-3xl bg-gradient-to-br from-cyan-500/15 to-blue-600/15 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-cyan-500/20 p-3">
                  <Trophy className="text-cyan-400" />
                </div>

                <div>
                  <h4 className="font-bold">{SUPPORTED_PLATFORMS.length}</h4>

                  <p className="text-sm text-slate-400">Platforms</p>
                </div>
              </div>

              <p className="text-sm leading-7 text-slate-400">
                More coding platforms are added regularly.
              </p>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
