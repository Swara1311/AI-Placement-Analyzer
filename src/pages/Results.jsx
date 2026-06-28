import { useNavigate } from 'react-router-dom'
import { Store } from '../utils/store'
import ProgressBar from '../components/ProgressBar'

export default function Results() {
  const navigate = useNavigate()
  const r = Store.get('results')
  if (!r) return <div className="empty-state"><p>No results. <button onClick={() => navigate('/analyze')}>Upload a resume →</button></p></div>

  const pc = r.profileCompleteness || {}
  const profileItems = [
    ['Projects', pc.projects ?? 30],
    ['Internship Experience', pc.internship ?? 20],
    ['Certifications', pc.certifications ?? 40],
    ['Technical Skills', pc.technicalSkills ?? 0],
  ]

  return (
    <div className="results-wrap">
      <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 4 }}>Your Analysis Report</h1>
      <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>Here's how your resume scored — and how to improve it.</p>

      {/* ATS Score + Skills */}
      <div className="grid-1-16 mb-20">
        <div className="score-card">
          <div className="label">🎯 ATS Score</div>
          <div className="score-big">{r.atsScore}<span>/100</span></div>
          <ProgressBar value={r.atsScore} color="rgba(255,255,255,0.55)" />
          <p className="score-note">
            {r.atsScore < 50 ? 'Needs work to pass ATS screening.' : r.atsScore < 75 ? 'Good — a few improvements needed.' : 'Strong ATS compatibility!'}
          </p>
        </div>
        <div className="card">
          <div className="section-title">🏅 Detected Skills</div>
          <div style={{ marginBottom: 12 }}>
            {r.detectedSkills?.length
              ? r.detectedSkills.map(s => <span key={s} className="skill-chip chip-green">{s}</span>)
              : <p style={{ color: '#9ca3af', fontSize: 14 }}>No major skills detected. Add a clear "Skills" section.</p>
            }
          </div>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Missing Key Skills</div>
          <div>{(r.missingSkills || []).map(s => <span key={s} className="skill-chip chip-gray">{s}</span>)}</div>
        </div>
      </div>

      {/* Strengths + Weaknesses */}
      <div className="grid-2 mb-20">
        <div className="card">
          <div className="section-title">✅ Strengths</div>
          {(r.strengths || []).map(s => <div key={s} className="check-item"><span className="check-green">✓</span>{s}</div>)}
        </div>
        <div className="card">
          <div className="section-title">⚠️ Weaknesses</div>
          {(r.weaknesses || []).map(s => <div key={s} className="check-item"><span className="check-red">!</span>{s}</div>)}
        </div>
      </div>

      {/* Profile Completeness */}
      <div className="card mb-20">
        <div className="section-title">📊 Profile Completeness</div>
        {profileItems.map(([label, val]) => (
          <div key={label}>
            <div className="progress-row"><span>{label}</span><span style={{ color: 'var(--purple)', fontWeight: 600 }}>{val}%</span></div>
            <ProgressBar value={val} />
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="card mb-20">
        <div className="section-title">💡 Personalized Suggestions</div>
        <div className="suggestion-grid">
          {(r.suggestions || []).map((s, i) => (
            <div key={i} className="suggestion-item">
              <div className="num-badge">{i + 1}</div><span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="action-row">
        <button className="btn btn-primary" onClick={() => navigate('/assessment')}>Take Assessment Test →</button>
        <button className="btn btn-outline" onClick={() => navigate('/dashboard')}>View Dashboard</button>
      </div>
    </div>
  )
}