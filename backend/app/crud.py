from app.database import get_cursor

conn, cursor = get_cursor()

cursor.execute("EXEC dbo.sp_InsertDailyChannelMetrics %s, %s, %s, %s, %s",
               (channel_id, subscribers, views, watch_time, revenue))
conn.commit()
cursor.close()
conn.close()
