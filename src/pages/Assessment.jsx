import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { Store } from '../utils/store'

export default function Assessment() {
  const [stage, setStage] = useState('intro') // intro | quiz
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(600)
  const timerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (stage !== 'quiz') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finish(answers); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [stage])

  function finish(finalAnswers) {
    clearInterval(timerRef.current)
    const cats = ['PROGRAMMING', 'DSA', 'APTITUDE', 'LOGICAL REASONING']
    const catScores = cats.map(cat => {
      const qs = QUESTIONS.map((q, i) => ({ ...q, i })).filter(q => q.cat === cat)
      return { cat, correct: qs.filter(q => finalAnswers[q.i] === q.ans).length, total: qs.length }
    })
    const correct = finalAnswers.filter((a, i) => a === QUESTIONS[i].ans).length
    Store.set('quizResults', { correct, total: QUESTIONS.length, catScores })
    navigate('/quiz-results')
  }

  function next() {
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)
    if (current + 1 >= QUESTIONS.length) { finish(newAnswers); return }
    setCurrent(c => c + 1)
    setSelected(newAnswers[current + 1] ?? null)
  }

  function prev() {
    setCurrent(c => c - 1)
    setSelected(answers[current - 1] ?? null)
  }

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')

  if (stage === 'intro') return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div className="card" style={{ maxWidth: 600, width: '100%', textAlign: 'center', padding: '3rem' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Placement Assessment</h1>
        <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>Test your skills across programming, DSA, aptitude, and reasoning.</p>
        <div className="stat-grid">
          {[['12', 'Questions'], ['10', 'Minutes'], ['4', 'Categories']].map(([n, l]) => (
            <div key={l} className="stat-box">
              <div className="stat-num">{n}</div>
              <div className="stat-lbl">{l}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setStage('quiz')}>Start Test →</button>
      </div>
    </div>
  )

  const q = QUESTIONS[current]
  return (
    <div className="assessment-wrap">
      <div className="quiz-header">
        <span>Question {current + 1} of {QUESTIONS.length}</span>
        <span className="timer">⏱ {mm}:{ss}</span>
      </div>
      <div className="progress-bg">
        <div className="progress-fill" style={{ width: `${(current / QUESTIONS.length) * 100}%` }} />
      </div>

      <div className="card question-card">
        <div className="q-category">{q.cat}</div>
        <div className="q-text">{q.q}</div>
        {q.opts.map((opt, i) => (
          <div key={i} className={`option ${selected === i ? 'selected' : ''}`} onClick={() => setSelected(i)}>
            <div className="radio-dot" />
            <span>{opt}</span>
          </div>
        ))}
      </div>

      <div className="quiz-nav">
        <button className="btn btn-outline" onClick={prev} disabled={current === 0}>← Previous</button>
        <button className="btn btn-primary" onClick={next} disabled={selected === null}>
          {current + 1 === QUESTIONS.length ? 'Finish' : 'Next →'}
        </button>
      </div>
    </div>
  )
}