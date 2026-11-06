export default function NewsFeed({ articles }) {
  return (
    <div>
      <p>Showing {articles.length} articles</p>

      {articles.map(article => (
        <article
          key={article.url}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "16px 0"
          }}
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

          <small>
            {article.source} ·{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </small>
        </article>
      ))}
    </div>
  );
}