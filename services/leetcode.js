const { normalizeContest, getJson } = require('@/utils/contestUtils');
async function fetchLeetCodeContests() {
  const url = process.env.LEETCODE_API;
  if (!url) return [];
  const data = await getJson(url);
  const rows = data.contests || data.result || data || [];
  return rows.map(c => normalizeContest('leetcode', { title: c.title || c.name, startTime: c.startTime || c.start_time, duration: c.duration || c.durationSeconds, url: c.url || c.link }));
}
module.exports = fetchLeetCodeContests;
