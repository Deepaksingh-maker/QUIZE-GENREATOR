# AI Quiz Generator (PDF/DOCX/TXT → Quiz)

A full-stack AI-powered quiz generator that lets users upload study files, extract and analyze content, generate quizzes with configurable options, attempt quizzes, and track history.

## Tech Stack
- **Frontend:** React + Tailwind CSS + Vite
- **Backend:** Node.js + Express
- **AI:** OpenAI API (can be swapped with Gemini/Claude)
- **Parsing:** `pdf-parse`, `mammoth` (DOCX), plain text parsing
- **Database:** MongoDB + Mongoose
- **Auth:** JWT

## Folder Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
└── docs/
    ├── AI_PROMPTS.md
    ├── API.md
    └── DEPLOYMENT.md
```

## Quick Start

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 3) Open app
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

## Beginner-friendly flow
1. User signs up/logs in.
2. User uploads one or many files (PDF/DOCX/TXT).
3. Backend parses text and stores normalized content.
4. User requests a quiz with filters (topic, difficulty, question count, time).
5. AI generates questions + answers in strict JSON format.
6. User attempts quiz, gets score, reviews solutions, and can retake.

## Sample prompt usage (for your provided input)
If you paste extracted PDF text, use `/api/quiz/from-text` with this request body:
```json
{
  "studyText": "<your extracted text>",
  "questionCount": 10,
  "difficulty": "medium",
  "types": ["mcq"]
}
```

