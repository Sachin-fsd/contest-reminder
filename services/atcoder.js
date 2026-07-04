const { normalizeContest } = require("@/utils/contestUtils");
const { fetchUpcomingContests } = require("@qatadaazzeh/atcoder-api");

function durationToSeconds(duration) {
  const [hours, minutes] = duration.split(":").map(Number);
  return hours * 3600 + minutes * 60;
}

async function fetchAtCoderContests() {
  try {
    const contests = await fetchUpcomingContests();

    return contests.map((c) =>
      normalizeContest("atcoder", {
        title: c.contestName,
        startTime: c.contestTime,
        duration: durationToSeconds(c.contestDuration),
        url: c.contestUrl,
      })
    );
  } catch (error) {
    console.error("Error fetching AtCoder contests:", error);
    return [];
  }
}

module.exports = fetchAtCoderContests;