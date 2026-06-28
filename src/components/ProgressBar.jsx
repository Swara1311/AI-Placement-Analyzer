export default function ProgressBar({ value, color }) {
  return (
    <div className="progress-bg">
      <div
        className="progress-fill"
        style={{ width: `${value}%`, background: color || 'var(--purple)' }}
      />
    </div>
  )
}