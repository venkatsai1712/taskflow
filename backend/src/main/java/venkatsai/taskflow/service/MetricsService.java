package venkatsai.taskflow.service;

import org.springframework.stereotype.Service;
import venkatsai.taskflow.dto.DashboardMetrics;
import venkatsai.taskflow.entity.JobEntity;
import venkatsai.taskflow.entity.JobStatus;
import venkatsai.taskflow.repository.JobRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MetricsService {
    private final JobRepository jobRepository;

    public MetricsService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public DashboardMetrics getDashboardMetrics() {
        List<JobEntity> jobs = jobRepository.findAll();
        long total = jobs.size();
        long pending = jobs.stream().filter(job -> job.getStatus() == JobStatus.PENDING).count();
        long processing = jobs.stream().filter(job -> job.getStatus() == JobStatus.PROCESSING).count();
        long completed = jobs.stream().filter(job -> job.getStatus() == JobStatus.COMPLETED).count();
        long failed = jobs.stream().filter(job -> job.getStatus() == JobStatus.FAILED).count();

        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        long throughput = jobs.stream()
                .filter(job -> job.getStatus() == JobStatus.COMPLETED)
                .filter(job -> job.getCompletedAt() != null && job.getCompletedAt().isAfter(oneHourAgo))
                .count();

        double errorRate = total == 0 ? 0 : (failed * 100.0 / total);
        double successRate = total == 0 ? 0 : (completed * 100.0 / total);

        double averageLatency = jobs.stream()
                .filter(job -> job.getStatus() == JobStatus.COMPLETED)
                .filter(job -> job.getCreatedAt() != null && job.getCompletedAt() != null)
                .mapToLong(job -> Duration.between(job.getCreatedAt(), job.getCompletedAt()).toSeconds())
                .filter(seconds -> seconds >= 0)
                .average()
                .orElse(0);

        return DashboardMetrics.builder()
                .totalJobs(total)
                .pendingJobs(pending)
                .processingJobs(processing)
                .completedJobs(completed)
                .failedJobs(failed)
                .throughputLastHour(throughput)
                .errorRate(round(errorRate))
                .successRate(round(successRate))
                .averageLatencySeconds(Math.round(averageLatency))
                .queueDepth(pending)
                .build();
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}
