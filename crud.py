from datetime import date
from .database import get_cursor

def insert_metrics(stats):
    cursor = get_cursor()
    cursor.execute("""
        EXEC dbo.sp_InsertDailyChannelMetrics ?, ?, ?, ?, ?
    """, stats["channel_id"], stats["subs"], stats["views"], 0, 0)
    cursor.commit()
