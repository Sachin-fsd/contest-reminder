const SUPPORTED_PLATFORMS = [
  {
    id: "leetcode.com",
    name: "LeetCode",
    color: "#FFA116",
    gradient: "from-yellow-500 to-orange-500",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/leetcode.svg",
    initials: "LC",
  },
  {
    id: "codeforces.com",
    name: "Codeforces",
    color: "#1F8ACB",
    gradient: "from-blue-500 to-cyan-500",
    logo: "https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000",
    initials: "CF",
  },
  {
    id: "atcoder.jp",
    name: "AtCoder",
    color: "#000000",
    gradient: "from-slate-700 to-zinc-400",
    logo: "https://img.atcoder.jp/assets/top/img/logo_bk.svg",
    initials: "AC",
  },
  {
    id: "codechef.com",
    name: "CodeChef",
    color: "#5B4638",
    gradient: "from-amber-700 to-stone-500",
    logo: "https://img.icons8.com/?size=100&id=Wq4dyyhFKRz6&format=png&color=000000",
    initials: "CC",
  },

  {
    id: "hackerrank.com",
    name: "HackerRank",
    color: "#2EC866",
    gradient: "from-green-500 to-emerald-600",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/hackerrank.svg",
    initials: "HR",
  },
  {
    id: "open.kattis.com",
    name: "Kattis",
    color: "#003D5B",
    gradient: "from-sky-700 to-blue-500",
    logo: "https://open.kattis.com/images/site-logo?v=0a3f6018aacf449381741e45cf0ff6ba",
    initials: "KT",
  },
  {
    id: "ac.nowcoder.com",
    name: "NowCoder",
    color: "#00C853",
    gradient: "from-green-500 to-lime-500",
    logo: "https://img.icons8.com/?size=100&id=87158&format=png&color=000000",
    initials: "NC",
  },
  {
    id: "naukri.com/code360",
    name: "Code360",
    color: "#FF6B00",
    gradient: "from-orange-500 to-red-500",
    logo: "https://www.code360.io/web-hosting/img/logo-c360-s.png",
    initials: "C3",
  },
  {
    id: "tlx.toki.id",
    name: "TLX TOKI",
    color: "#2563EB",
    gradient: "from-blue-600 to-indigo-600",
    logo: "https://tlx.toki.id/favicon.ico",
    initials: "TL",
  },
  {
    id: "uoj.ac",
    name: "Universal Online Judge",
    color: "#6B21A8",
    gradient: "from-purple-600 to-violet-700",
    logo: "https://cups.online/static/dist/cups/icons/cup.svg",
    initials: "UJ",
  },
  {
    id: "codingcontest.org",
    name: "Coding Contest",
    color: "#0EA5E9",
    gradient: "from-sky-500 to-cyan-500",
    logo: "https://codingcontest.org/favicon.ico",
    initials: "CG",
  },
  {
    id: "kep.uz",
    name: "KEP",
    color: "#7C3AED",
    gradient: "from-violet-500 to-purple-600",
    logo: "https://kep.uz/favicon.ico",
    initials: "KP",
  },
  {
    id: "repovive.com",
    name: "Repovive",
    color: "#EF4444",
    gradient: "from-red-500 to-pink-500",
    logo: "https://repovive.com/favicon.ico",
    initials: "RV",
  },
  {
    id: "midnightcodecup.org",
    name: "Midnight Code Cup",
    color: "#111827",
    gradient: "from-gray-800 to-slate-900",
    logo: "https://midnightcodecup.org/favicon.ico",
    initials: "MC",
  },
  {
    id: "datsteam.dev",
    name: "Datsteam",
    color: "#2563EB",
    gradient: "from-blue-500 to-indigo-500",
    logo: "https://datsteam.dev/favicon.ico",
    initials: "DS",
  },
  {
    id: "basecamp.eolymp.com",
    name: "EOlymp Basecamp",
    color: "#0F766E",
    gradient: "from-teal-600 to-cyan-700",
    logo: "https://basecamp.eolymp.com/favicon.ico",
    initials: "EO",
  },
  {
    id: "cups.online",
    name: "Cups Online",
    color: "#DC2626",
    gradient: "from-red-600 to-rose-600",
    logo: "https://cups.online/favicon.ico",
    initials: "CP",
  },
  {
    id: "ctftime.org",
    name: "CTFtime",
    color: "#1E293B",
    gradient: "from-slate-700 to-slate-900",
    logo: "https://ctftime.org/static/images/favicon.png",
    initials: "CT",
  },
  {
    id: "kaggle.com",
    name: "Kaggle",
    color: "#20BEFF",
    gradient: "from-cyan-400 to-sky-500",
    logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/kaggle.svg",
    initials: "KG",
  },
  {
    id: "stats.ioinformatics.org",
    name: "IOI Stats",
    color: "#2563EB",
    gradient: "from-blue-500 to-sky-500",
    logo: "https://stats.ioinformatics.org/favicon.ico",
    initials: "IO",
  },
  {
    id: "wincentdragonbyte.com",
    name: "DragonByte",
    color: "#EA580C",
    gradient: "from-orange-500 to-red-600",
    logo: "https://www.wincentdragonbyte.com/favicon.ico",
    initials: "DB",
  },
];

const SUPPORTED_PLATFORM_IDS = SUPPORTED_PLATFORMS.map((platform) => platform.id);

const PLATFORM_META = SUPPORTED_PLATFORMS.reduce((meta, platform) => {
  meta[platform.id] = {
    label: platform.name,
    color: platform.gradient,
    brandColor: platform.color,
    logo: platform.initials,
    logoPath: platform.logo,
  };
  return meta;
}, {});

function isSupportedPlatform(platformId) {
  return SUPPORTED_PLATFORM_IDS.includes(platformId);
}

function getPlatformMeta(platformId) {
  const normalizedId = String(platformId || "").toLowerCase();
  if (PLATFORM_META[normalizedId]) {
    return PLATFORM_META[normalizedId];
  }

  const fallbackLabel = normalizedId
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

  return {
    label: fallbackLabel || "Unknown Host",
    color: "from-slate-500 to-slate-400",
    brandColor: "#64748b",
    logo: (fallbackLabel || "?").slice(0, 2).toUpperCase(),
    logoPath: null,
  };
}

function filterSupportedPlatformIds(platformIds) {
  return Array.from(new Set(platformIds)).filter(isSupportedPlatform);
}

module.exports = {
  SUPPORTED_PLATFORMS,
  SUPPORTED_PLATFORM_IDS,
  PLATFORM_META,
  isSupportedPlatform,
  getPlatformMeta,
  filterSupportedPlatformIds,
};
