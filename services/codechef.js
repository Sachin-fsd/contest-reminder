const { normalizeContest, getJson } = require('@/utils/contestUtils');
async function fetchCodeChefContests() {
  const url = process.env.CODECHEF_API;
  if (!url) return [];
  const data = await getJson(url);
  const rows = data.future_contests || data.contests || data.result || data || [];
  return rows.map(c => normalizeContest('codechef', { title: c.contest_name || c.name || c.title, startTime: c.contest_start_date_iso || c.startTime || c.start_time, duration: c.contest_duration ? Number(c.contest_duration) * 60 : c.duration, url: c.contest_code ? `https://www.codechef.com/${c.contest_code}` : c.url }));
}
module.exports = fetchCodeChefContests;
