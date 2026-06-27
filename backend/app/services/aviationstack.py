import os
from typing import Optional

import httpx

from app.models.schemas import Airport, FlightInfo

AVIATIONSTACK_BASE_URL = "http://api.aviationstack.com/v1/flights"


class FlightLookupError(Exception):
    pass


def _parse_airport(data: dict) -> Airport:
    return Airport(
        name=data.get("airport"),
        iata=data.get("iata"),
        terminal=data.get("terminal"),
        gate=data.get("gate"),
        scheduled_time=data.get("scheduled"),
        estimated_time=data.get("estimated"),
        actual_time=data.get("actual"),
        delay_minutes=data.get("delay"),
    )


async def get_flight_info(flight_number: str) -> Optional[FlightInfo]:
    api_key = os.getenv("AVIATIONSTACK_API_KEY")
    if not api_key:
        raise FlightLookupError(
            "AVIATIONSTACK_API_KEY не задан. Добавьте ключ в backend/.env"
        )

    params = {"access_key": api_key, "flight_iata": flight_number}

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(AVIATIONSTACK_BASE_URL, params=params)
            response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            raise FlightLookupError(
                "Не удалось получить данные о рейсе. Проверьте AVIATIONSTACK_API_KEY."
            ) from exc
        except httpx.HTTPError as exc:
            raise FlightLookupError("Сервис данных о рейсах недоступен") from exc
        payload = response.json()

    if "error" in payload:
        raise FlightLookupError(payload["error"].get("message", "Ошибка AviationStack"))

    results = payload.get("data") or []
    if not results:
        return None

    flight = results[0]
    departure = _parse_airport(flight.get("departure") or {})
    arrival = _parse_airport(flight.get("arrival") or {})

    return FlightInfo(
        flight_number=flight_number,
        airline=(flight.get("airline") or {}).get("name"),
        flight_status=flight.get("flight_status"),
        departure=departure,
        arrival=arrival,
    )
