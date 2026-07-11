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

                  ${item.id === active
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

      {/* <div className="mx-6 my-2 h-px bg-white/10" /> */}
    </aside>
  );
}
