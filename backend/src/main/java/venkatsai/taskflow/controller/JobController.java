package venkatsai.taskflow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import venkatsai.taskflow.dto.JobRequest;
import venkatsai.taskflow.dto.JobResponse;
import venkatsai.taskflow.dto.DashboardMetrics;
import venkatsai.taskflow.service.JobService;
import venkatsai.taskflow.service.MetricsService;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${APP_CORS_ALLOWED_ORIGINS:http://localhost:5173}")
public class JobController {
    private final JobService jobService;
    private final MetricsService metricsService;
    public JobController(JobService jobService, MetricsService metricsService){
        this.jobService = jobService;
        this.metricsService = metricsService;
    }
    @PostMapping("/job")
    public ResponseEntity<JobResponse> createJob(@RequestBody JobRequest req) throws InterruptedException {
        return ResponseEntity.status(201).body(jobService.createJob(req));
    }
    @GetMapping("/job/{id}")
    public ResponseEntity<JobResponse> getJob(@PathVariable String id){
        return ResponseEntity.status(200).body(jobService.getJob(id));
    }
    @GetMapping("/jobs")
    public ResponseEntity<List<JobResponse>> getJobs(){
        return ResponseEntity.ok(jobService.getJobs());
    }
    @GetMapping("/metrics")
    public ResponseEntity<DashboardMetrics> getMetrics(){
        return ResponseEntity.ok(metricsService.getDashboardMetrics());
    }
}
