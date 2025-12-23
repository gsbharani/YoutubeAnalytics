CREATE OR ALTER PROCEDURE dbo.sp_InsertDailyChannelMetrics
    @channel_id NVARCHAR(50),
    @subscribers BIGINT,
    @views BIGINT,
    @watch_time_minutes BIGINT,
    @revenue_estimate DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @today DATE = CAST(GETDATE() AS DATE);

    IF EXISTS (
        SELECT 1 FROM channel_daily_metrics
        WHERE channel_id = @channel_id AND metric_date = @today
    )
    BEGIN
        UPDATE channel_daily_metrics
        SET
            subscribers = @subscribers,
            views = @views,
            watch_time_minutes = @watch_time_minutes,
            revenue_estimate = @revenue_estimate,
            created_at = SYSDATETIME()
        WHERE channel_id = @channel_id
          AND metric_date = @today;
    END
    ELSE
    BEGIN
        INSERT INTO channel_daily_metrics
        (channel_id, metric_date, subscribers, views, watch_time_minutes, revenue_estimate)
        VALUES
        (@channel_id, @today, @subscribers, @views, @watch_time_minutes, @revenue_estimate);
    END
END;
