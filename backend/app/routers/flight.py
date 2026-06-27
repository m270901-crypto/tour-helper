from fastapi import APIRouter, HTTPException

from app.models.schemas import FlightInfo
from app.services.aviationstack import FlightLookupError, get_flight_info

router = APIRouter(prefix="/api/flight", tags=["flight"])


@router.get("/{flight_number}", response_model=FlightInfo)
async def lookup_flight(flight_number: str):
    try:
        flight = await get_flight_info(flight_number.upper())
    except FlightLookupError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    if flight is None:
        raise HTTPException(status_code=404, detail="Рейс не найден")

    return flight
