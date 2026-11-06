const Parser = require("rss-parser");

const parser = new Parser({ timeout: 10000 });
const cache = new Map();

const TTL = 10 * 60 * 1000; // 10 minutes

async function getFeed(url, forceRefresh = false) {
  const now = Date.now();
  const entry = cache.get(url);

  // 1. Reuse an ongoing request
  if (entry?.pending) {
    return entry.pending;
  }

  // 2. Return cached data if still valid
  if (!forceRefresh && entry?.data && now < entry.expiresAt) {
    return {
      ...entry.data,
      cached: true,
      fetchedAt: entry.fetchedAt
    };
  }

  // 3. Fetch a fresh RSS feed
  const pending = parser.parseURL(url)
    .then(feed => {
      const fetchedAt = new Date().toISOString();

      cache.set(url, {
        data: feed,
        fetchedAt,
        expiresAt: Date.now() + TTL
      });

      return {
        ...feed,
        cached: false,
        fetchedAt
      };
    })
    .catch(error => {
      // Remove the failed pending request
      // but preserve previously successful data
      if (cache.get(url)?.pending === pending) {
        if (entry?.data) {
          cache.set(url, entry);
        } else {
          cache.delete(url);
        }
      }

      throw error;
    });

  cache.set(url, {
    ...entry,
    pending
  });

  return pending;
}

module.exports = { getFeed };