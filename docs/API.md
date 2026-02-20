# Backend API Guide

Base URL: `http://localhost:5000/api`

## Auth
### POST `/auth/register`
```json
{ "name": "Alice", "email": "alice@test.com", "password": "secret123" }
```

### POST `/auth/login`
```json
{ "email": "alice@test.com", "password": "secret123" }
```

## Upload
### POST `/upload` (JWT)
- `multipart/form-data`
- field name: `files`
- supports multiple files

### GET `/upload` (JWT)
- lists upload history

## Quiz
### POST `/quiz/generate` (JWT)
```json
{
  "documentIds": ["..."] ,
  "questionCount": 10,
  "difficulty": "medium",
  "topic": "Thermodynamics",
  "timeLimitMinutes": 20,
  "randomized": true,
  "types": ["mcq", "true_false"]
}
```

### POST `/quiz/from-text`
Use this to generate from pasted extracted text directly.
```json
{
  "studyText": "...",
  "questionCount": 10,
  "difficulty": "medium",
  "types": ["mcq"]
}
```

### GET `/quiz` (JWT)
- list generated quizzes

### POST `/quiz/attempt` (JWT)
```json
{
  "quizId": "...",
  "answers": [
    { "questionIndex": 0, "selectedAnswer": "Option A" }
  ]
}
```
