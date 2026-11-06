module.exports = [
  // CBC News
  {
    name: "CBC",
    category: "Canada",
    url: "https://www.cbc.ca/webfeed/rss/rss-canada",
    enabled: true
  },
  {
    name: "CBC",
    category: "Politics",
    url: "https://www.cbc.ca/webfeed/rss/rss-politics",
    enabled: true
  },
  {
    name: "CBC",
    category: "Business",
    url: "https://www.cbc.ca/webfeed/rss/rss-business",
    enabled: true
  },
  {
    name: "CBC",
    category: "Technology",
    url: "https://www.cbc.ca/webfeed/rss/rss-technology",
    enabled: true
  },
  {
    name: "CBC",
    category: "Health",
    url: "https://www.cbc.ca/webfeed/rss/rss-health",
    enabled: true
  },

  // Global News
  {
    name: "Global News",
    category: "Canada",
    url: "https://globalnews.ca/canada/feed/",
    enabled: true
  },

  // National Post
  {
    name: "National Post",
    category: "Canada",
    url: "https://nationalpost.com/feed/",
    enabled: false
  },

  // CTV News — disabled because its old RSS URL returns 404
  {
    name: "CTV News",
    category: "Canada",
    url: "https://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009",
    enabled: false
  }
];