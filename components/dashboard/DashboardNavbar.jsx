"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardNavbar({ user }) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/70 backdrop-blur-3xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 font-black shadow-lg shadow-cyan-500/30">
              CR
            </div>

            <div>

              <h1 className="text-lg font-black">
                ContestReminder
              </h1>

              <p className="text-xs text-slate-400">
                Dashboard
              </p>

            </div>

          </Link>

          {/* Search */}

          <div className="hidden w-full max-w-xl lg:block">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                placeholder="Search contests..."
                className="
                h-12
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                pl-12
                pr-4
                outline-none
                transition
                focus:border-cyan-500
                "
              />

            </div>

          </div>

          {/* Right */}

          <div className="flex items-center gap-4">

            {/* Notification */}

            <button className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition hover:border-cyan-500">

              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-cyan-400" />

            </button>

            {/* Profile */}

            <div className="relative hidden md:block">

              <button
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-2 pl-3 transition hover:border-cyan-500"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 font-bold">

                  {user?.name?.charAt(0).toUpperCase()}

                </div>

                <div className="text-left">

                  <p className="text-sm font-semibold">

                    {user?.name}

                  </p>

                  <p className="text-xs text-slate-500">

                    {user?.email}

                  </p>

                </div>

                <ChevronDown size={16} />

              </button>

              <AnimatePresence>

                {profileOpen && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="absolute right-0 mt-3 w-60 rounded-3xl border border-white/10 bg-slate-950/95 p-3 backdrop-blur-xl"
                  >

                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-3 rounded-2xl p-4 transition hover:bg-white/5"
                    >

                      <LogOut size={18} />

                      Logout

                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

            {/* Mobile */}

            <button
              onClick={() =>
                setMenuOpen(true)
              }
              className="rounded-xl border border-white/10 p-3 md:hidden"
            >
              <Menu />
            </button>

          </div>

        </div>

      </header>

      {/* Mobile Drawer */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur"
          >

            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              className="absolute right-0 h-full w-80 bg-slate-950 p-8"
            >

              <div className="mb-10 flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  Menu
                </h2>

                <button
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  <X />
                </button>

              </div>

              <div className="mb-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 font-bold">

                  {user?.name?.charAt(0)}

                </div>

                <div>

                  <h3 className="font-bold">
                    {user?.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {user?.email}
                  </p>

                </div>

              </div>

              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-2xl border border-white/10 p-4"
              >

                <LogOut />

                Logout

              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}