from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import flight, news, regions

app = FastAPI(title="Tour Helper API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(flight.router)
app.include_router(regions.router)
app.include_router(news.router)


@app.get("/api/health")
async def health():
    return {"status": "ok"}
