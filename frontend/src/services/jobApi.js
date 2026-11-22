const API_URL = import.meta.env.VITE_API_URL || ''

function payloadFor(type, recipient) {
  if (type === 'EMAIL') return { emailId: recipient }
  if (type === 'SMS') return { number: recipient }
  return { recipient }
}

export async function createJob(type, recipient) {
  const response = await fetch(`${API_URL}/api/job`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type,
      payLoad: payloadFor(type, recipient),
    }),
  })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return response.json()
}

export async function getJob(jobId) {
  const response = await fetch(`${API_URL}/api/job/${jobId}`)
  if (!response.ok) return null
  return response.json()
}

export async function getJobs() {
  const response = await fetch(`${API_URL}/api/jobs`)
  if (!response.ok) return []
  return response.json()
}

export async function getMetrics() {
  const response = await fetch(`${API_URL}/api/metrics`)
  if (!response.ok) return null
  return response.json()
}
