const express = require("express");
const router = express.Router();

const { getWeeklyNews } = require("../services/newsService");

// GET /api/news
router.get("/", async (req, res) => {
  try {
    const articles = await getWeeklyNews();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve news" });
  }
});

// GET /api/news/stats
router.get("/stats", async (req, res) => {
  try {
    const articles = await getWeeklyNews();

    const bySource = articles.reduce((stats, article) => {
      stats[article.source] = (stats[article.source] || 0) + 1;
      return stats;
    }, {});

    res.json({
      totalArticles: articles.length,
      bySource,
      latestArticle: articles[0]?.publishedAt || null,
      oldestArticle: articles.at(-1)?.publishedAt || null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve stats" });
  }
});

module.exports = router;