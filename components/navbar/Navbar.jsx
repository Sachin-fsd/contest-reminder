"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Bell } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Platforms",
    href: "#platforms",
  },
  {
    name: "How it Works",
    href: "#how",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handle);

    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      <motion.header
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: .6,
        }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-slate-950/70 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
              <Bell size={22} />
            </div>

            <div>
              <h1 className="text-xl font-black">
                ContestReminder
              </h1>

              <p className="text-xs text-slate-400">
                Never miss a contest
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-slate-300 transition hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">

            <Link
              href="/login"
              className="rounded-xl border border-white/10 px-5 py-2.5 transition hover:border-blue-500"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 font-semibold shadow-lg shadow-blue-600/30 transition hover:scale-105"
            >
              Get Started
            </Link>

          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden"
          >
            <Menu />
          </button>

        </div>
      </motion.header>

      <AnimatePresence>

        {mobileOpen && (

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
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur"
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
              transition={{
                type: "spring",
              }}
              className="absolute right-0 h-full w-80 bg-slate-950 p-8"
            >

              <div className="mb-10 flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  Menu
                </h2>

                <button
                  onClick={() => setMobileOpen(false)}
                >
                  <X />
                </button>

              </div>

              <div className="space-y-5">

                {links.map((link) => (

                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl border border-white/5 p-4 hover:border-blue-500"
                  >
                    {link.name}
                  </Link>

                ))}

              </div>

              <div className="mt-10 space-y-4">

                <Link
                  href="/login"
                  className="block rounded-xl border border-white/10 p-4 text-center"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="block rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-center font-semibold"
                >
                  Get Started
                </Link>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}