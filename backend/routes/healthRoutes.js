const express = require("express");
const router = express.Router();

const { checkAllFeeds } = require("../services/feedHealthService");

// GET /api/sources/health
router.get("/health", async (req, res) => {
  try {
    const results = await checkAllFeeds();

    res.json({
      total: results.length,
      healthy: results.filter(
        r => r.status === "healthy"
      ).length,
      unhealthy: results.filter(
        r => r.status === "unhealthy"
      ).length,
      disabled: results.filter(
        r => r.status === "disabled"
      ).length,
      feeds: results
    });

  } catch (error) {
    console.error("Health check failed:", error);

    res.status(500).json({
      error: "Failed to check RSS sources"
    });
  }
});

// IMPORTANT: Export the Router function directly
module.exports = router;