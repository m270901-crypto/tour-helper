from fastapi import APIRouter, HTTPException

from app.models.schemas import Region, RegionSummary
from app.services.regions import get_region, list_regions

router = APIRouter(prefix="/api/regions", tags=["regions"])


@router.get("", response_model=list[RegionSummary])
async def get_regions():
    return list_regions()


@router.get("/{region_id}", response_model=Region)
async def get_region_detail(region_id: str):
    region = get_region(region_id)
    if region is None:
        raise HTTPException(status_code=404, detail="Регион не найден")
    return region
