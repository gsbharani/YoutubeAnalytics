from fastapi import APIRouter
from app.youtube import resolve_channel_id, fetch_stats
from app.crud import insert_metrics

router = APIRouter()

@router.get("/analyze")
def analyze(url: str):
    channel_id = resolve_channel_id(url)
    stats = fetch_stats(channel_id)
    insert_metrics(stats)
    return stats
