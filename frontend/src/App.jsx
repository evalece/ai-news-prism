
import { useEffect, useState } from "react";

import { getNews } from "./api/newsApi";
import NewsFeed from "./components/NewsFeed";
import SourceFilter from "./components/SourceFilter";
import CategoryFilter from "./components/CategoryFilter";

import "./App.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadNews() {
      try {
        setLoading(true);
        setError(null);

        const data = await getNews();

        if (!cancelled) {
          setArticles(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      cancelled = true;
    };
  }, []);

  const sources = [
    ...new Set(articles.map(article => article.source))
  ];

  const categories = [
    ...new Set(
      articles.flatMap(article =>
        article.categories ?? (
          article.category ? [article.category] : []
        )
      )
    )
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSource =
      selectedSource === "all" ||
      article.source === selectedSource;

    const articleCategories =
      article.categories ??
      (article.category ? [article.category] : []);

    const matchesCategory =
      selectedCategory === "all" ||
      articleCategories.includes(selectedCategory);

    return matchesSource && matchesCategory;
  });

  return (
    <main className="app">
      <header className="app-header">
        <h1>🐚 AI News Prism</h1>
        <p>Canadian news, multiple perspectives.</p>
      </header>

      <section className="filters">
        <SourceFilter
          sources={sources}
          selectedSource={selectedSource}
          onSourceChange={setSelectedSource}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </section>

      {loading && <p>Loading news...</p>}

      {error && (
        <p className="error">
          Error: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="article-count">
            Showing {filteredArticles.length} of {articles.length} articles
          </p>

          <NewsFeed articles={filteredArticles} />
        </>
      )}
    </main>
  );
}
