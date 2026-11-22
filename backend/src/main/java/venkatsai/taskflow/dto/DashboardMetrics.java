package venkatsai.taskflow.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardMetrics {
    private long totalJobs;
    private long pendingJobs;
    private long processingJobs;
    private long completedJobs;
    private long failedJobs;
    private long throughputLastHour;
    private double errorRate;
    private double successRate;
    private long averageLatencySeconds;
    private long queueDepth;
}
