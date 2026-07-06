const { fetchWithCache, sortContests } = require('@/utils/contestUtils');
const services = [
  require('./leetcode'),
  // require('./codeforces'),
  // require('./codechef'),
  // require('./atcoder'),
];

async function fetchAllContests() {
  return fetchWithCache('all-contests', async () => {
    const results = await Promise.allSettled(services.map((service) => service()));

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Contest service ${index} failed:`, result.reason);
      }
    });

    return sortContests(results.flatMap((r) => (r.status === 'fulfilled' ? r.value : [])));
  });
}

module.exports = { fetchAllContests };
