const { getFeed } = require("./rssService");
const sources = require("../config/sources");


async function getWeeklyNews() {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;

const enabledSources = sources.filter(source => source.enabled);

const results = await Promise.allSettled(
  enabledSources.map(async (source) => {
    const feed = await getFeed(source.url);

      return feed.items
        .filter(item => {
          const date = Date.parse(item.isoDate || item.pubDate);
          return Number.isFinite(date) && date >= cutoff;
        })
        .map(item => ({
          title: item.title,
          source: source.name,
          category: source.category,
          url: item.link,
          publishedAt: item.isoDate || item.pubDate
        }));
    })
  );

  const articles = results.flatMap((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    }

    console.error(
      `Failed to fetch ${enabledSources[index].name}:`,
      result.reason.message
    );
    return [];
  });

  return articles
    .filter(article => article.title && article.url)
    .filter((article, index, all) =>
      all.findIndex(other => other.url === article.url) === index
    )
    .sort((a, b) =>
      new Date(b.publishedAt) - new Date(a.publishedAt)
    );
}

module.exports = { getWeeklyNews };