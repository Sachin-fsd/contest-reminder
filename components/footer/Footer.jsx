"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Mail, ArrowUpRight, Heart } from "lucide-react";

const productLinks = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Platforms",
    href: "#platforms",
  },
  {
    title: "How it Works",
    href: "#how",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];

const resourceLinks = [
  {
    title: "Documentation",
    href: "#",
  },
  {
    title: "API",
    href: "#",
  },
  {
    title: "Privacy",
    href: "/privacy",
  },
  {
    title: "Terms",
    href: "/terms",
  },
];

const socialLinks = [
  {
    icon: "https://img.icons8.com/?size=100&id=12598&format=png&color=000000",
    href: "https://github.com/Sachin-fsd",
  },
  {
    icon: "https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=000000",
    href: "https://twitter.com",
  },
  {
    icon: "https://img.icons8.com/?size=100&id=447&format=png&color=000000",
    href: "https://www.linkedin.com/in/realsachin/",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-1/3 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-3">
                <Bell size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-black">ContestReminder</h2>

                <p className="text-sm text-slate-400">
                  Never miss a coding contest.
                </p>
              </div>
            </Link>

            <p className="mt-8 leading-8 text-slate-400">
              Beautiful reminders for competitive programmers. Stay focused on
              solving problems while we remember every contest for you.
            </p>

            <div className="mt-8 flex gap-4">
              {socialLinks.map((social) => {
                return (
                  <motion.a
                    whileHover={{
                      y: -4,
                    }}
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-cyan-500"
                  >
                    <img src={social.icon} size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Product */}

          <FooterColumn title="Product" items={productLinks} />

          {/* Resources */}

          <FooterColumn title="Resources" items={resourceLinks} />

          {/* Newsletter */}

          <div>
            <h3 className="text-xl font-bold">Stay Updated</h3>

            <p className="mt-4 leading-7 text-slate-400">
              Get notified whenever we add new platforms and features.
            </p>

            <div className="mt-8">
              <div className="flex rounded-2xl border border-white/10 bg-white/5 p-2">
                <input
                  placeholder="Email address"
                  className="flex-1 bg-transparent px-4 outline-none"
                />

                <button className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3">
                  <Mail size={18} />
                </button>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
              <p className="text-sm text-cyan-300">
                🚀 Upcoming feature: Google Calendar Sync.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            Made with
            <Heart size={16} className="fill-red-500 text-red-500" />
            for Competitive Programmers.
          </div>

          <div>
            © {new Date().getFullYear()} ContestReminder. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3 className="mb-6 text-xl font-bold">{title}</h3>

      <div className="space-y-4">
        {items.map((item) => (
          <motion.div
            whileHover={{
              x: 5,
            }}
            key={item.title}
          >
            <Link
              href={item.href}
              className="flex items-center gap-2 text-slate-400 transition hover:text-cyan-400"
            >
              {item.title}

              <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
