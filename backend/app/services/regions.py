import json
from functools import lru_cache
from pathlib import Path
from typing import Optional

from app.models.schemas import Region, RegionSummary

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "turkey_regions.json"


@lru_cache
def _load_data() -> dict:
    with open(DATA_PATH, encoding="utf-8") as f:
        return json.load(f)


def list_regions() -> list[RegionSummary]:
    data = _load_data()
    return [
        RegionSummary(id=r["id"], name=r["name"], name_en=r["name_en"])
        for r in data["regions"]
    ]


def get_region(region_id: str) -> Optional[Region]:
    data = _load_data()
    for r in data["regions"]:
        if r["id"] == region_id:
            return Region(**r)
    return None
