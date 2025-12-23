# backend/app/compare.py

from database import get_cursor

def compare_channels(channel_id_1, channel_id_2):
    cursor = get_cursor()

    query = """
    SELECT 
        c.channel_name,
        m.metric_date,
        m.subscribers,
        m.views
    FROM channel_daily_metrics m
    JOIN channels c ON c.channel_id = m.channel_id
    WHERE m.channel_id IN (?, ?)
    ORDER BY m.metric_date DESC
    """

    cursor.execute(query, channel_id_1, channel_id_2)
    rows = cursor.fetchall()

    result = {}
    for row in rows:
        name = row.channel_name
        if name not in result:
            result[name] = []
        result[name].append({
            "date": row.metric_date,
            "subscribers": row.subscribers,
            "views": row.views
        })

    return result
