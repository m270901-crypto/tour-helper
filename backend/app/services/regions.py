import json
from functools import lru_cache
from pathlib import Path
from typing import Optional

from app.models.schemas import CountrySummary, Region, RegionSummary

DATA_DIR = Path(__file__).resolve().parent.parent / "data" / "countries"


@lru_cache
def _load_country(country_id: str) -> Optional[dict]:
    path = DATA_DIR / f"{country_id}.json"
    if not path.exists():
        return None
    with open(path, encoding="utf-8") as f:
        return json.load(f)


@lru_cache
def list_countries() -> list[CountrySummary]:
    countries = []
    for path in sorted(DATA_DIR.glob("*.json")):
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        countries.append(
            CountrySummary(
                id=data["country"],
                name=data["name"],
                name_en=data["name_en"],
                currency=data["currency"],
                currency_label=data["currency_label"],
            )
        )
    return countries


def get_news_query(country_id: str) -> Optional[str]:
    data = _load_country(country_id)
    if data is None:
        return None
    return data.get("news_query", data.get("name"))


def list_regions(country_id: str) -> Optional[list[RegionSummary]]:
    data = _load_country(country_id)
    if data is None:
        return None
    return [
        RegionSummary(id=r["id"], name=r["name"], name_en=r["name_en"])
        for r in data["regions"]
    ]


def get_region(country_id: str, region_id: str) -> Optional[Region]:
    data = _load_country(country_id)
    if data is None:
        return None
    for r in data["regions"]:
        if r["id"] == region_id:
            return Region(**r)
    return None
