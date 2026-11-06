
export default function NewsFeed({ articles }) {
  if (articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <div className="news-feed">
      {articles.map((article, index) => (
        <article
          key={article.url || index}
          className="news-card"
        >
          <h3>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.title}
            </a>
          </h3>

          <div className="news-meta">
            <span>{article.source}</span>

            {article.publishedAt && (
              <span>
                {new Date(
                  article.publishedAt
                ).toLocaleString()}
              </span>
            )}
          </div>

          {article.categories?.length > 0 && (
            <div className="news-categories">
              {article.categories.map(category => (
                <span
                  key={category}
                  className="category-tag"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
