from fastapi import APIRouter, HTTPException

from app.models.schemas import CountrySummary, Region, RegionSummary
from app.services.regions import get_region, list_countries, list_regions

router = APIRouter(prefix="/api", tags=["regions"])


@router.get("/countries", response_model=list[CountrySummary])
async def get_countries():
    return list_countries()


@router.get("/countries/{country_id}/regions", response_model=list[RegionSummary])
async def get_regions(country_id: str):
    regions = list_regions(country_id)
    if regions is None:
        raise HTTPException(status_code=404, detail="Страна не найдена")
    return regions


@router.get("/countries/{country_id}/regions/{region_id}", response_model=Region)
async def get_region_detail(country_id: str, region_id: str):
    region = get_region(country_id, region_id)
    if region is None:
        raise HTTPException(status_code=404, detail="Регион не найден")
    return region
