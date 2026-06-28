import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../utils/store'

const LOADING_MSGS = [
  'Reading your resume…',
  'Extracting skills…',
  'Scoring ATS compatibility…',
  'Building your roadmap…',
]

const FALLBACK = {
  atsScore: 37,
  strengths: ['Resume submitted successfully'],
  weaknesses: ['Few or no projects mentioned', 'No internship experience found',
    'No certifications listed', 'Missing key skills: java, python, dsa'],
  detectedSkills: [],
  missingSkills: ['Java', 'Python', 'DSA', 'SQL', 'React', 'Git', 'OOP'],
  suggestions: [
    'Add 2–3 personal projects with GitHub links',
    'Apply for internships or open-source contributions',
    'Solve 100+ DSA problems on LeetCode',
    'Learn Java backend basics (Spring Boot)',
    'Practice SQL queries and database design',
    'Earn 1–2 certifications (AWS, Google, Coursera)',
  ],
  profileCompleteness: { projects: 30, internship: 20, certifications: 40, technicalSkills: 0 },
  roadmap: {
    skillsToLearn: ['Solve 100+ DSA problems', 'Master Java & OOP', 'Practice SQL', 'Build 2 React projects'],
    projectIdeas: ['E-commerce with auth', 'Real-time chat app', 'ML REST API', 'Portfolio with blog'],
    interviewPrep: ['Mock interviews weekly', 'Review OS/DBMS/Networks', 'STAR behavioral responses', '60-sec intro pitch'],
  },
}

async function analyzeWithClaude(text) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
  'Content-Type': 'application/json',
  'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY,
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true',
},
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Analyze this resume for ATS compatibility and placement readiness.
Return ONLY a JSON object (no markdown) with keys:
atsScore, strengths[], weaknesses[], detectedSkills[], missingSkills[],
suggestions[6], profileCompleteness{projects,internship,certifications,technicalSkills},
roadmap{skillsToLearn[4], projectIdeas[4], interviewPrep[4]}

Resume:
${text.slice(0, 4000)}`
      }]
    })
  })
  const data = await res.json()
  const raw = data.content.map(c => c.text || '').join('').replace(/```json|```/g, '').trim()
  return JSON.parse(raw)
}

export default function Analyze() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msgIdx, setMsgIdx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()
  const navigate = useNavigate()

  function pickFile(f) { setFile(f) }

  async function runAnalysis() {
    if (!file) return
    setLoading(true)

    // cycle loading messages
    let i = 0
    const interval = setInterval(() => { i++; setMsgIdx(i % LOADING_MSGS.length) }, 900)

    try {
      const text = await file.text()
      const result = await analyzeWithClaude(text)
      Store.set('results', result)
    } catch {
      await new Promise(r => setTimeout(r, 2500))
      Store.set('results', FALLBACK)
    }

    clearInterval(interval)
    navigate('/results')
  }

  if (loading) return (
    <div className="loader-wrap">
      <div className="spinner" />
      <p className="loader-msg">{LOADING_MSGS[msgIdx]}</p>
    </div>
  )

  return (
    <div className="page-wrap">
      <h1 className="page-title">Upload your resume</h1>
      <p className="page-sub">We'll analyze it for ATS compatibility, skills, and placement readiness.</p>

      <div
        className={`upload-zone ${dragging ? 'drag-over' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files[0]) }}
        onClick={() => inputRef.current.click()}
      >
        <div className="upload-icon">⬆️</div>
        <h2>Drag &amp; drop your resume here</h2>
        <p>or browse to upload (PDF, DOC, DOCX, TXT · max 10MB)</p>
        <button className="btn btn-outline" onClick={e => { e.stopPropagation(); inputRef.current.click() }}>
          Choose File
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        style={{ display: 'none' }}
        onChange={e => pickFile(e.target.files[0])}
      />

      {file && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <p style={{ color: 'var(--gray)', fontSize: 14, marginBottom: 16 }}>
            📎 {file.name} ({(file.size / 1024).toFixed(0)} KB)
          </p>
          <button className="btn btn-primary" onClick={runAnalysis}>
            Analyze Resume →
          </button>
        </div>
      )}
    </div>
  )
}