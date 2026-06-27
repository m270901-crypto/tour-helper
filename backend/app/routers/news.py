from fastapi import APIRouter, HTTPException

from app.models.schemas import NewsArticle
from app.services.news import NewsLookupError, get_news
from app.services.regions import get_news_query

router = APIRouter(prefix="/api/news", tags=["news"])


@router.get("/{country_id}", response_model=list[NewsArticle])
async def country_news(country_id: str):
    query = get_news_query(country_id)
    if query is None:
        raise HTTPException(status_code=404, detail="Страна не найдена")

    try:
        return await get_news(query)
    except NewsLookupError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
