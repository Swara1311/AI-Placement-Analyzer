import { useNavigate } from 'react-router-dom'
import { Store } from '../utils/store'
import ProgressBar from '../components/ProgressBar'

export default function QuizResults() {
  const navigate = useNavigate()
  const qr = Store.get('quizResults')
  if (!qr) return <div className="empty-state"><p>No results. <button onClick={() => navigate('/assessment')}>Take the assessment →</button></p></div>

  const pct = Math.round((qr.correct / qr.total) * 100)

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '2rem' }}>
      <div className="result-hero">
        <div className="trophy">🏆</div>
        <h1>Test Complete!</h1>
        <p className="sub">You scored</p>
        <div className="result-score">{qr.correct}/{qr.total}</div>
        <div className="result-pct">{pct}% accuracy</div>
      </div>

      <div className="card mb-24">
        <div className="section-title">📊 Category Performance</div>
        {qr.catScores.map(({ cat, correct, total }) => (
          <div key={cat}>
            <div className="progress-row">
              <span>{cat.charAt(0) + cat.slice(1).toLowerCase()}</span>
              <span style={{ color: 'var(--gray)' }}>{correct}/{total} · {Math.round(correct / total * 100)}%</span>
            </div>
            <ProgressBar value={(correct / total) * 100} />
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>View Full Dashboard →</button>
      </div>
    </div>
  )
}