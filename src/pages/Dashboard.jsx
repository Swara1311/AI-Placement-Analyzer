import { useNavigate } from 'react-router-dom'
import { Store } from '../utils/store'
import ProgressBar from '../components/ProgressBar'

export default function Dashboard() {
  const navigate = useNavigate()
  const r  = Store.get('results')
  const qr = Store.get('quizResults')

  if (!r && !qr) return (
    <div className="empty-state">
      <p>Your dashboard is empty.<br />
        <button onClick={() => navigate('/analyze')}>Upload a resume</button> or{' '}
        <button onClick={() => navigate('/assessment')}>take the assessment</button> first.
      </p>
    </div>
  )

  const atsScore  = r?.atsScore ?? 0
  const assessPct = qr ? Math.round((qr.correct / qr.total) * 100) : 0
  const overall   = Math.round(atsScore * 0.6 + assessPct * 0.4)
  const pc        = r?.profileCompleteness || {}
  const level     = overall < 40 ? 'Beginner' : overall < 70 ? 'Intermediate' : 'Advanced'

  const roadmap = r?.roadmap || {
    skillsToLearn: ['Solve 100+ DSA problems', 'Master Java & OOP', 'Practice SQL', 'Build React projects'],
    projectIdeas:  ['E-commerce with auth', 'Real-time chat app', 'ML REST API', 'Portfolio blog'],
    interviewPrep: ['Mock interviews weekly', 'Review OS/DBMS/Networks', 'STAR responses', '60-sec intro'],
  }

  const suggestions = r?.suggestions || [
    'Add 2–3 projects with GitHub links', 'Apply for internships',
    'Solve 100+ LeetCode problems', 'Learn Spring Boot',
    'Practice SQL queries', 'Earn 1–2 certifications',
  ]

  const catScores = qr?.catScores || [
    { cat: 'Programming', correct: 0, total: 3 },
    { cat: 'DSA', correct: 0, total: 3 },
    { cat: 'Aptitude', correct: 0, total: 3 },
    { cat: 'Logical Reasoning', correct: 0, total: 3 },
  ]

  return (
    <div className="dashboard-wrap">
      <div className="dash-top">
        <div><h1>Placement Readiness</h1><p>Your complete career readiness overview.</p></div>
        <button className="btn btn-primary" onClick={() => window.print()}>⬇ Download Report</button>
      </div>

      {/* Overall Score */}
      <div className="grid-1-16 mb-20">
        <div className="placement-card">
          <div className="lbl">Overall Placement Score</div>
          <div className="placement-big">{overall}<span>/100</span></div>
          <ProgressBar value={overall} color="rgba(255,255,255,0.5)" />
          <div className="badge-row">
            {overall < 50 && <span className="badge red">Needs Improvement</span>}
            <span className="badge">{level}</span>
          </div>
        </div>
        <div className="score-mini-grid">
          <div className="card score-mini">
            <div style={{ color: 'var(--gray)', fontSize: 13, marginBottom: 4 }}>📄 Resume Score</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{atsScore}/100</div>
          </div>
          <div className="card score-mini">
            <div style={{ color: 'var(--gray)', fontSize: 13, marginBottom: 4 }}>🎯 Assessment Score</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{assessPct}%</div>
          </div>
        </div>
      </div>

      {/* Strengths + Weaknesses */}
      <div className="grid-2 mb-20">
        <div className="card">
          <div className="section-title">✅ Top Strengths</div>
          {(r?.strengths || ['Resume submitted successfully']).map(s => (
            <div key={s} className="check-item"><span className="check-green">✓</span>{s}</div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">⚠️ Areas to Improve</div>
          {(r?.weaknesses || ['Few or no projects mentioned', 'No internship found']).map(s => (
            <div key={s} className="check-item"><span className="check-red">!</span>{s}</div>
          ))}
        </div>
      </div>

      {/* Assessment Breakdown */}
      <div className="card mb-20">
        <div className="section-title">🏅 Assessment Breakdown</div>
        <div className="grid-2">
          {catScores.map(({ cat, correct, total }) => (
            <div key={cat}>
              <div className="progress-row">
                <span>{cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}</span>
                <span style={{ color: '#9ca3af' }}>{correct}/{total}</span>
              </div>
              <ProgressBar value={(correct / total) * 100} />
            </div>
          ))}
        </div>
      </div>

      {/* Profile Completeness */}
      {r && (
        <div className="card mb-20">
          <div className="section-title">📊 Profile Completeness</div>
          {[['Projects', pc.projects ?? 30], ['Internship Experience', pc.internship ?? 20],
            ['Certifications', pc.certifications ?? 40], ['Technical Skills', pc.technicalSkills ?? 0]
          ].map(([label, val]) => (
            <div key={label}>
              <div className="progress-row">
                <span>{label}</span><span style={{ color: 'var(--purple)', fontWeight: 600 }}>{val}%</span>
              </div>
              <ProgressBar value={val} />
            </div>
          ))}
        </div>
      )}

      {/* Roadmap */}
      <div className="card mb-20">
        <div className="section-title">📈 Your Personalized Roadmap</div>
        <div className="roadmap-grid">
          {[['</> Skills to Learn', roadmap.skillsToLearn],
            ['💼 Project Ideas', roadmap.projectIdeas],
            ['💬 Interview Prep', roadmap.interviewPrep]
          ].map(([title, items]) => (
            <div key={title} className="roadmap-col">
              <h4>{title}</h4>
              {items.map(item => <div key={item} className="roadmap-item">{item}</div>)}
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="card">
        <div className="section-title">📋 Action Items</div>
        <div className="suggestion-grid">
          {suggestions.map((s, i) => (
            <div key={i} className="suggestion-item">
              <div className="num-badge">{i + 1}</div><span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}