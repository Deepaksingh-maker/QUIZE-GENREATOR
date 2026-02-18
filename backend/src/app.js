import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(
  '/api',
  rateLimit({
    windowMs: 60 * 1000,
    max: 120
  })
);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/quiz', quizRoutes);

app.use(errorHandler);

export default app;
