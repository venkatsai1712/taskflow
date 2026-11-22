export default function Stats({ counts }) {
  return (
    <div className="stats">
      <Stat label="Pending" value={counts.PENDING} tone="amber" />
      <Stat label="Processing" value={counts.PROCESSING} tone="blue" />
      <Stat label="Completed" value={counts.COMPLETED} tone="green" />
    </div>
  )
}

function Stat({ label, value, tone }) {
  return (
    <div className="stat">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <span className={`stat-dot ${tone}`} />
    </div>
  )
}
