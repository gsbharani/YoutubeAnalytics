from fastapi import APIRouter
from app.services.excel_service import load_channels

router = APIRouter(prefix="/channels", tags=["Channels"])

@router.get("/")
def get_channels():
    return load_channels()

@router.get("/compare")
def compare_channels():
    data = load_channels()
    return {
        "labels": [c["channel_name"] for c in data],
        "subscribers": [c["subscribers"] for c in data],
        "views": [c["views"] for c in data]
    }
