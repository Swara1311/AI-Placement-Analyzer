# AI Placement Analyzer 🎯

An AI-powered resume analyzer and placement readiness platform built with React + Vite.

Upload your resume, get an ATS score, take a skill assessment, and receive a personalized roadmap to crack campus placements.

## 🔗 Live Demo
[Coming soon — deploy on Netlify]

---

## ✨ Features

- 📄 **Resume Upload** — Drag & drop or browse (PDF, DOC, DOCX, TXT)
- 🤖 **AI Analysis** — Powered by Claude API (ATS score, skills, strengths, weaknesses)
- 🔍 **Skill Gap Detection** — Detected skills + missing key skills
- 📊 **Profile Completeness** — Projects, internship, certifications, technical skills score
- 🧠 **Placement Assessment** — 12 MCQ quiz (Programming, DSA, Aptitude, Logical Reasoning) with 10-min timer
- 🗺️ **Personalized Roadmap** — Skills to learn, project ideas, interview prep
- 📈 **Dashboard** — Combined placement readiness score from resume + assessment

---

## 🛠️ Tech Stack

- React 18
- Vite
- React Router v6
- Claude API (claude-sonnet-4-6)
- Plain CSS
- localStorage for data persistence

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   └── ProgressBar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Analyze.jsx
│   ├── Results.jsx
│   ├── Assessment.jsx
│   ├── QuizResults.jsx
│   └── Dashboard.jsx
├── data/
│   └── questions.js
├── utils/
│   └── store.js
├── App.jsx
├── App.css
└── main.jsx
```

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Swara1311/AI-Placement-Analyzer.git
cd AI-Placement-Analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API key

Create a `.env` file in the root folder:

```
VITE_ANTHROPIC_KEY=your_claude_api_key_here
```

Get your key from [console.anthropic.com](https://console.anthropic.com)

### 4. Run the project

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🚀 Build & Deploy

```bash
npm run build
```

Drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop) — live in seconds.

---

## 👤 Author

**Swara** — [GitHub](https://github.com/Swara1311)

---

## 📄 License

MIT