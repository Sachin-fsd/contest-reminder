const { normalizeContest, getJson } = require('@/utils/contestUtils');

async function fetchLeetCodeContests() {
  const url = process.env.LEETCODE_API;
  if (!url) return [];

  try {
    const data = await getJson(url);
    const rows = data.objects || data.contests || data.result || data || [];

    return rows
      // .filter((c) => {
      //   const host = `${c.host || ''} ${c.resource || ''}`.toLowerCase();
      //   return host.includes('leetcode') || host.includes('leetcode.com');
      // })
      .map((c) =>
        normalizeContest(c.host, {
          title: c.event || c.title || c.name,
          startTime: c.start || c.startTime || c.start_time,
          duration: c.duration || c.durationSeconds,
          url: c.href || c.url || c.link,
        }),
      );
  } catch (error) {
    console.error('Error fetching LeetCode contests:', error);
    return [];
  }
}

module.exports = fetchLeetCodeContests;
