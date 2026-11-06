
const { getFeed } = require("./rssService");
const sources = require("../config/sources");

// Check the health of one RSS source
async function checkFeed(source) {
  if (!source.enabled) {
    return {
      source: source.name,
      category: source.category,
      status: "disabled"
    };
  }

  try {
    // Use our shared RSS service (with caching)
    const feed = await getFeed(source.url);

    // Temporary debug log
    /* 
    console.log("HEALTH DEBUG:", {
      source: source.name,
      cached: feed.cached,
      fetchedAt: feed.fetchedAt
    });
    */
    return {
      source: source.name,
      category: source.category,
      status: "healthy",
      articleCount: feed.items.length,
      cached: feed.cached,
      fetchedAt: feed.fetchedAt,
      checkedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error(`Feed health check failed: ${source.name}`, error);

    return {
      source: source.name,
      category: source.category,
      status: "unhealthy",
      error: error.message,
      checkedAt: new Date().toISOString()
    };
  }
}

// Check all RSS sources concurrently
async function checkAllFeeds() {
  return Promise.all(sources.map(checkFeed));
}

module.exports = {
  checkFeed,
  checkAllFeeds
};
