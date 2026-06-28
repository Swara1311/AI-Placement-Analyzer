import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import Results from './pages/Results'
import Assessment from './pages/Assessment'
import QuizResults from './pages/QuizResults'
import Dashboard from './pages/Dashboard'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/analyze"      element={<Analyze />} />
        <Route path="/results"      element={<Results />} />
        <Route path="/assessment"   element={<Assessment />} />
        <Route path="/quiz-results" element={<QuizResults />} />
        <Route path="/dashboard"    element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}