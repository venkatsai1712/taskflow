export default function JobList({ jobs }) {
  return (
    <section className="card list-card">
      <div className="card-title">
        <h2>Recent jobs</h2>
        <p>Live status updates</p>
      </div>

      {jobs.length === 0 ? (
        <div className="empty">
          <span className="empty-icon">✓</span>
          <h3>No jobs yet</h3>
          <p>Create your first job to see it here.</p>
        </div>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <article className="job" key={job.jobId}>
              <div className={`job-icon ${job.type?.toLowerCase()}`}>{job.type?.[0]}</div>
              <div className="job-main">
                <strong>{job.type} delivery</strong>
                <span>{job.recipient}</span>
              </div>
              <div className={`badge ${job.status?.toLowerCase()}`}>{job.status}</div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
