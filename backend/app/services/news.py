import os

import httpx

from app.models.schemas import NewsArticle

GNEWS_URL = "https://gnews.io/api/v4/search"


class NewsLookupError(Exception):
    pass


async def get_news(query: str, lang: str = "ru", max_results: int = 10) -> list[NewsArticle]:
    api_key = os.getenv("GNEWS_API_KEY")
    if not api_key:
        raise NewsLookupError("GNEWS_API_KEY не задан. Добавьте ключ в backend/.env")

    params = {
        "q": query,
        "lang": lang,
        "max": max_results,
        "sortby": "publishedAt",
        "token": api_key,
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(GNEWS_URL, params=params)
            response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            raise NewsLookupError(
                "Не удалось получить новости. Проверьте GNEWS_API_KEY"
            ) from exc
        except httpx.HTTPError as exc:
            raise NewsLookupError("Сервис новостей недоступен") from exc
        payload = response.json()

    articles = payload.get("articles") or []
    return [
        NewsArticle(
            title=a.get("title"),
            description=a.get("description"),
            url=a.get("url"),
            source_name=(a.get("source") or {}).get("name"),
            published_at=a.get("publishedAt"),
            image=a.get("image"),
        )
        for a in articles
    ]
