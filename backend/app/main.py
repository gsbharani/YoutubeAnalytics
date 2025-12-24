from fastapi import FastAPI
from app.routes.channel import router as channel_router

app = FastAPI(title="YouTube Analytics API")

app.include_router(channel_router)

@app.get("/")
def root():
    return {"status": "YouTube Analytics API running"}
