export default function Metrics({ metrics }) {
  const values = metrics || {
    pendingJobs: 0,
    processingJobs: 0,
    completedJobs: 0,
    failedJobs: 0,
    throughputLastHour: 0,
    errorRate: 0,
    successRate: 0,
    averageLatencySeconds: 0,
    queueDepth: 0,
  }

  const cards = [
    { label: 'Throughput', value: values.throughputLastHour, suffix: '/hr', tone: 'violet' },
    { label: 'Success rate', value: values.successRate, suffix: '%', tone: 'green' },
    { label: 'Error rate', value: values.errorRate, suffix: '%', tone: 'red' },
    { label: 'Avg. latency', value: values.averageLatencySeconds, suffix: 'sec', tone: 'blue' },
  ]

  return (
    <section className="metrics-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">OBSERVABILITY</p>
          <h2>System overview</h2>
        </div>
        <span className="live-label"><span /> Live</span>
      </div>

      <div className="metrics-grid">
        {cards.map((card) => (
          <article className={`metric-card ${card.tone}`} key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}<small>{card.suffix}</small></strong>
          </article>
        ))}
      </div>

      <div className="health-grid">
        <article className="health-card">
          <div className="health-title">
            <h3>Job pipeline</h3>
            <span>{values.queueDepth} queued</span>
          </div>
          <Pipeline label="Pending" value={values.pendingJobs} tone="pending" />
          <Pipeline label="Processing" value={values.processingJobs} tone="processing" />
          <Pipeline label="Completed" value={values.completedJobs} tone="completed" />
          <Pipeline label="Failed" value={values.failedJobs} tone="failed" />
        </article>

        <article className="health-card">
          <div className="health-title">
            <h3>Worker health</h3>
            <span className="healthy"><span /> Healthy</span>
          </div>
          <dl className="details">
            <div><dt>Queue depth</dt><dd>{values.queueDepth}</dd></div>
            <div><dt>Active jobs</dt><dd>{values.processingJobs}</dd></div>
            <div><dt>Completed</dt><dd>{values.completedJobs}</dd></div>
            <div><dt>Failed</dt><dd>{values.failedJobs}</dd></div>
          </dl>
        </article>
      </div>
    </section>
  )
}

function Pipeline({ label, value, tone }) {
  return (
    <div className="pipeline-row">
      <span>{label}</span>
      <div className="pipeline-track">
        <span className={tone} style={{ width: `${Math.min(100, value * 10)}%` }} />
      </div>
      <strong>{value}</strong>
    </div>
  )
}
