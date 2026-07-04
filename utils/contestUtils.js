const axios = require("axios");
const cache = new Map();
const { PLATFORM_META } = require("@/utils/platforms");
function normalizeContest(platform, item) {
  return {
    platform,
    title: item.title || item.name,
    startTime: new Date(
      item.startTime || item.start_time || item.start,
    ).toISOString(),
    duration: Number(item.duration || item.durationSeconds || 0),
    url: item.url || item.link,
  };
}
function sortContests(contests) {
  return contests
    .filter((c) => c.title && c.startTime && new Date(c.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
}
function withinNext24Hours(contest) {
  const start = new Date(contest.startTime).getTime();
  const now = Date.now();
  return start >= now && start <= now + 24 * 60 * 60 * 1000;
}
async function fetchWithCache(key, fetcher, ttlMs = 5 * 60 * 1000) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.time < ttlMs) return hit.data;
  const data = await fetcher();
  cache.set(key, { time: Date.now(), data });
  return data;
}
async function getJson(url, config = {}) {
  const { data } = await axios.get(url, { timeout: 10000, ...config });
  return data;
}
module.exports = {
  PLATFORM_META,
  normalizeContest,
  sortContests,
  withinNext24Hours,
  fetchWithCache,
  getJson,
};
