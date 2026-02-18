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

## How to run the app (step-by-step for beginners)

### Prerequisites
- Install **Node.js 18+** and npm.
- Install and run **MongoDB** (local MongoDB or Atlas).
- Get an **OpenAI API key**.

Check tools:
```bash
node -v
npm -v
```

### 1) Start backend API
```bash
cd backend
npm install
cp .env.example .env
```

Now open `backend/.env` and set:
- `MONGODB_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY`

Then run backend:
```bash
npm run dev
```

Backend health check:
```bash
curl http://localhost:5000/api/health
```

### 2) Start frontend
Open a second terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### 3) Open in browser
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

### 4) Use the app
1. Register/login.
2. Upload PDF/DOCX/TXT files.
3. Select uploaded docs.
4. Set difficulty, question count, topic, time.
5. Click **Generate Quiz with AI**.

### 5) Generate 10 medium MCQs from pasted text
If you already extracted text from a PDF, call this endpoint:
```bash
curl -X POST http://localhost:5000/api/quiz/from-text \
  -H "Content-Type: application/json" \
  -d '{
    "studyText": "PASTE YOUR EXTRACTED TEXT HERE",
    "questionCount": 10,
    "difficulty": "medium",
    "types": ["mcq"]
  }'
```

### Troubleshooting
- If `npm install` fails with `403 Forbidden`, check npm proxy/registry settings:
```bash
npm config get registry
npm config get proxy
npm config get https-proxy
```
- Recommended registry:
```bash
npm config set registry https://registry.npmjs.org/
```

- If backend cannot connect DB, verify `MONGODB_URI` in `backend/.env`.
- If quiz generation fails, verify `OPENAI_API_KEY` and model name.

## Quick Start (short version)

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
