import { useEffect, useState } from 'react'
import JobForm from './components/JobForm'
import JobList from './components/JobList'
import Stats from './components/Stats'
import Metrics from './components/Metrics'
import { createJob, getJob, getJobs, getMetrics } from './services/jobApi'

export default function App() {
  const [type, setType] = useState('EMAIL')
  const [recipient, setRecipient] = useState('')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    async function loadDashboard() {
      const [savedJobs, currentMetrics] = await Promise.all([
        getJobs(),
        getMetrics(),
      ])
      setJobs(savedJobs)
      setMetrics(currentMetrics)
    }
    loadDashboard()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(async () => {
      setMetrics(await getMetrics())
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const pending = jobs.filter((job) =>
      ['PENDING', 'PROCESSING'].includes(job.status),
    )
    if (!pending.length) return

    const timer = window.setInterval(async () => {
      await Promise.all(pending.map(async (job) => {
        try {
          const updated = await getJob(job.jobId)
          if (!updated) return
          setJobs((current) => current.map((item) =>
            item.jobId === updated.jobId ? { ...item, ...updated } : item,
          ))
        } catch {
          // Keep the dashboard usable while the API is temporarily unavailable.
        }
      }))
    }, 2000)

    return () => window.clearInterval(timer)
  }, [jobs])

  async function handleCreateJob(type, recipient) {
    setError('')
    setLoading(true)
    try {
      const job = await createJob(type, recipient)
      setJobs((current) => [{ ...job, type, recipient }, ...current])
      setRecipient('')
      setMetrics(await getMetrics())
    } catch (requestError) {
      setError(requestError.message || 'Could not create the job.')
    } finally {
      setLoading(false)
    }
  }

  const counts = {
    PENDING: metrics?.pendingJobs ?? jobs.filter((job) => job.status === 'PENDING').length,
    PROCESSING: metrics?.processingJobs ?? jobs.filter((job) => job.status === 'PROCESSING').length,
    COMPLETED: metrics?.completedJobs ?? jobs.filter((job) => job.status === 'COMPLETED').length,
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">T</span>
          <span>TaskFlow</span>
        </div>
        <div className="status"><span /> System operational</div>
      </header>

      <section className="content">
        <div className="heading">
          <p className="eyebrow">WORKSPACE</p>
          <h1>Job operations</h1>
        </div>

        <Stats counts={counts} />
        <Metrics metrics={metrics} />

        <div className="grid">
          <JobForm
            type={type}
            recipient={recipient}
            loading={loading}
            error={error}
            onTypeChange={setType}
            onRecipientChange={setRecipient}
            onSubmit={handleCreateJob}
          />
          <JobList jobs={jobs} />
        </div>
      </section>
    </main>
  )
}
