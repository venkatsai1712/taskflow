export default function JobForm({
  type,
  recipient,
  loading,
  error,
  onTypeChange,
  onRecipientChange,
  onSubmit,
}) {
  function handleSubmit(event) {
    event.preventDefault()
    if (!recipient.trim()) return
    onSubmit(type, recipient.trim())
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="card-title">
        <h2>Create job</h2>
        <p>Add work to the distributed queue</p>
      </div>

      <label>
        <span>Job type</span>
        <select value={type} onChange={(event) => onTypeChange(event.target.value)}>
          <option value="EMAIL">Email</option>
          <option value="SMS">SMS</option>
          <option value="WHATSAPP">WhatsApp</option>
        </select>
      </label>

      <label>
        <span>{type === 'EMAIL' ? 'Email address' : type === 'SMS' ? 'Phone number' : 'WhatsApp number'}</span>
        <input
          value={recipient}
          onChange={(event) => onRecipientChange(event.target.value)}
          placeholder={type === 'EMAIL' ? 'name@company.com' : '+1 555 0100'}
        />
      </label>

      {error && <div className="error" role="alert">{error}</div>}
      <button type="submit" disabled={loading || !recipient.trim()}>
        {loading ? 'Adding job...' : 'Create job'}
      </button>
    </form>
  )
}
