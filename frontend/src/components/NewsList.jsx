import { useEffect, useState } from "react";
import { fetchNews } from "../api/client";

function formatDate(value) {
  if (!value) return null;
  try {
    return new Date(value).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export default function NewsList({ countryId }) {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryId) return;
    setArticles(null);
    setError(null);
    fetchNews(countryId)
      .then(setArticles)
      .catch((err) => setError(err.message));
  }, [countryId]);

  if (!countryId) return null;

  return (
    <div className="card">
      <h2>Новости</h2>
      {error && <p className="error">{error}</p>}
      {!error && !articles && <p className="muted">Загрузка новостей…</p>}
      {articles?.length === 0 && <p className="muted">Новостей не найдено</p>}

      {articles?.map((a) => (
        <a
          key={a.url}
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-item"
        >
          <p className="news-title">{a.title}</p>
          <p className="news-meta">
            {a.source_name}
            {a.published_at ? ` · ${formatDate(a.published_at)}` : ""}
          </p>
        </a>
      ))}
    </div>
  );
}
