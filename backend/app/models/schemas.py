from typing import Optional
from pydantic import BaseModel


class Airport(BaseModel):
    name: Optional[str] = None
    iata: Optional[str] = None
    terminal: Optional[str] = None
    gate: Optional[str] = None
    scheduled_time: Optional[str] = None
    estimated_time: Optional[str] = None
    actual_time: Optional[str] = None
    delay_minutes: Optional[int] = None


class FlightInfo(BaseModel):
    flight_number: str
    airline: Optional[str] = None
    flight_status: Optional[str] = None
    departure: Airport
    arrival: Airport


class Hospital(BaseModel):
    name: str
    type: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None


class Mall(BaseModel):
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    description: Optional[str] = None


class Attraction(BaseModel):
    name: str
    description: Optional[str] = None


class Consulate(BaseModel):
    name: str
    address: Optional[str] = None
    phone: Optional[str] = None
    hours: Optional[str] = None


class Emergency(BaseModel):
    police_general: Optional[str] = None
    police_short: Optional[str] = None
    police_note: Optional[str] = None
    consulate: Optional[Consulate] = None


class Transport(BaseModel):
    public: Optional[str] = None
    card: Optional[str] = None
    apps: list[str] = []
    taxi_apps: list[str] = []


class Region(BaseModel):
    id: str
    name: str
    name_en: str
    emergency: Emergency
    hospitals: list[Hospital] = []
    pharmacy_note: Optional[str] = None
    malls: list[Mall] = []
    attractions: list[Attraction] = []
    transport: Transport


class RegionSummary(BaseModel):
    id: str
    name: str
    name_en: str


class CountrySummary(BaseModel):
    id: str
    name: str
    name_en: str
    currency: str
    currency_label: str


class NewsArticle(BaseModel):
    title: str
    description: Optional[str] = None
    url: str
    source_name: Optional[str] = None
    published_at: Optional[str] = None
    image: Optional[str] = None
