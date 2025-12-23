# backend/app/models.py

from pydantic import BaseModel
from datetime import date

class ChannelAnalyzeRequest(BaseModel):
    url: str


class ChannelStatsResponse(BaseModel):
    channel_id: str
    channel_name: str
    subscribers: int
    views: int
    videos: int


class DailyMetrics(BaseModel):
    channel_id: str
    metric_date: date
    subscribers: int
    views: int
    watch_time_minutes: int = 0
    revenue_estimate: float = 0.0
