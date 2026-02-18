# Deployment Guide (Beginner Friendly)

## 1) MongoDB
Use MongoDB Atlas and copy your connection string into backend `.env`.

## 2) Backend deploy (Render/Railway/Fly)
- Build command: `npm install`
- Start command: `npm start`
- Root directory: `backend`
- Environment variables:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `OPENAI_API_KEY`
  - `OPENAI_MODEL`
  - `CLIENT_URL`

## 3) Frontend deploy (Vercel/Netlify)
- Build command: `npm run build`
- Publish directory: `dist`
- Root directory: `frontend`
- Env var: `VITE_API_BASE_URL=https://your-backend-domain/api`

## 4) Security checklist
- Enable HTTPS.
- Restrict CORS to frontend domain.
- Rotate JWT and API secrets periodically.
- Add virus scanning for uploaded files in production.
- Use object storage (S3/GCS) instead of local disk for uploads.
