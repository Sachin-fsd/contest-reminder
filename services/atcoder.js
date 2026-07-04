const { normalizeContest, getJson } = require('@/utils/contestUtils');
async function fetchAtCoderContests() {
  const url = process.env.ATCODER_API;
  if (!url) return [];
  const data = await getJson(url);
  const rows = data.contests || data.result || data || [];
  return rows.map(c => normalizeContest('atcoder', { title: c.title || c.name, startTime: c.startTime || c.start_time, duration: c.duration, url: c.url || c.link }));
}
module.exports = fetchAtCoderContests;
