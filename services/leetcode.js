const { normalizeContest, getJson } = require("@/utils/contestUtils");

async function fetchLeetCodeContests() {
  const url = process.env.LEETCODE_API;
  if (!url) return [];

  try {
    const data = await getJson(url);
    const rows = data.objects || [];

    return rows.map((c) => ({
      platform: c.host,
      title: c.event,
      startTime: `${c.start}Z`,
      duration: c.duration,
      url: c.href,
    }));
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error);
    return [];
  }
}

module.exports = fetchLeetCodeContests;
