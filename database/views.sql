CREATE OR ALTER VIEW vw_channel_growth AS
SELECT
    c.channel_name,
    m.channel_id,
    m.metric_date,
    m.subscribers,
    m.views,
    m.subscribers
      - LAG(m.subscribers) OVER (PARTITION BY m.channel_id ORDER BY m.metric_date)
      AS daily_subscriber_growth
FROM channel_daily_metrics m
JOIN channels c ON c.channel_id = m.channel_id;
