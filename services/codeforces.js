const { normalizeContest, getJson } = require('@/utils/contestUtils');
async function fetchCodeforcesContests() {
  const url = process.env.CODEFORCES_API || 'https://codeforces.com/api/contest.list?gym=false';
  const data = await getJson(url);
  const rows = data.result || data || [];
  return rows.filter(c => c.phase === 'BEFORE' || c.startTimeSeconds * 1000 > Date.now()).map(c => normalizeContest('codeforces', { title: c.name, startTime: new Date(c.startTimeSeconds * 1000), duration: c.durationSeconds, url: `https://codeforces.com/contests/${c.id}` }));
}
module.exports = fetchCodeforcesContests;
