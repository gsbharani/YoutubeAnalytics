CREATE TABLE channels (
    channel_id NVARCHAR(50) PRIMARY KEY,
    channel_name NVARCHAR(255),
    created_at DATETIME2 DEFAULT SYSDATETIME()
);

CREATE TABLE channel_daily_metrics (
    id INT IDENTITY PRIMARY KEY,
    channel_id NVARCHAR(50),
    metric_date DATE,
    subscribers BIGINT,
    views BIGINT,
    watch_time_minutes BIGINT,
    revenue_estimate DECIMAL(10,2),
    created_at DATETIME2 DEFAULT SYSDATETIME(),
    CONSTRAINT fk_channel_metrics
        FOREIGN KEY (channel_id) REFERENCES channels(channel_id),
    CONSTRAINT uq_channel_date
        UNIQUE (channel_id, metric_date)
);
