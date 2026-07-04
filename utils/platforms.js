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
  // {
  //   id: "codechef",
  //   name: "CodeChef",
  //   color: "#5B4638",
  //   gradient: "from-amber-700 to-stone-500",
  //   logo: "/platforms/codechef.svg",
  //   initials: "CC",
  // },
  {
    id: "atcoder.jp",
    name: "AtCoder",
    color: "#000000",
    gradient: "from-slate-500 to-zinc-300",
    logo: "https://img.atcoder.jp/assets/top/img/logo_bk.svg",
    initials: "AC",
  },
  {
    id: "codechef.com",
    name: "CodeChef",
    color: "#5B4638",
    gradient: "from-amber-700 to-stone-500",
    logo: "/platforms/codechef.svg",
    initials: "CC",
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
