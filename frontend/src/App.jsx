import { useEffect, useState } from "react";

import { getNews } from "./api/newsApi";
import NewsFeed from "./components/NewsFeed";
import CategoryFilter from "./components/SourceFilter";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getNews()
      .then(setArticles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    ...new Set(articles.flatMap(a => a.categories || []))
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSource =
      selectedSource === "All" ||
      article.source === selectedSource;

    const matchesCategory =
      selectedCategory === "All" ||
      article.categories?.includes(selectedCategory);

    return matchesSource && matchesCategory;
  });

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1>🐚 AI News Prism</h1>
      <p>Canadian news from multiple publishers</p>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {loading && <p>Loading news...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <NewsFeed articles={filteredArticles} />
      )}
    </main>
  );
}