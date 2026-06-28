import { useNavigate } from 'react-router-dom'

const features = [
  { icon: '📄', title: 'ATS Score', desc: 'Check how well your resume passes automated screening.' },
  { icon: '🎯', title: 'Skill Gap Analysis', desc: 'Find missing skills recruiters expect for your role.' },
  { icon: '🗺️', title: 'Personalized Roadmap', desc: 'Step-by-step plan with projects and timelines.' },
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <main className="hero">
      <div className="hero-badge">✦ AI-Powered Resume Analysis</div>
      <h1 className="hero-title">
        Know your placement<br />
        <span className="purple">readiness score</span>
      </h1>
      <p className="hero-sub">
        Upload your resume, take a skill assessment, and get a personalized
        roadmap to crack campus placements.
      </p>
      <div className="hero-btns">
        <button className="btn btn-primary" onClick={() => navigate('/analyze')}>
          Analyze my resume →
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/assessment')}>
          Take assessment
        </button>
      </div>
      <div className="feature-grid">
        {features.map(f => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}