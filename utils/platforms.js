const SUPPORTED_PLATFORMS = [
  {
    id: "leetcode",
    name: "LeetCode",
    color: "#FFA116",
    gradient: "from-yellow-500 to-orange-500",
    logo: "/platforms/leetcode.svg",
    initials: "LC",
  },
  {
    id: "codeforces",
    name: "Codeforces",
    color: "#1F8ACB",
    gradient: "from-blue-500 to-cyan-500",
    logo: "/platforms/codeforces.svg",
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
    id: "atcoder",
    name: "AtCoder",
    color: "#000000",
    gradient: "from-slate-500 to-zinc-300",
    logo: "/platforms/atcoder.svg",
    initials: "AC",
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

function filterSupportedPlatformIds(platformIds) {
  return Array.from(new Set(platformIds)).filter(isSupportedPlatform);
}

module.exports = {
  SUPPORTED_PLATFORMS,
  SUPPORTED_PLATFORM_IDS,
  PLATFORM_META,
  isSupportedPlatform,
  filterSupportedPlatformIds,
};
