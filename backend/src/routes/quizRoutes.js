import { Router } from 'express';
import {
  createQuiz,
  createQuizFromText,
  listMyQuizzes,
  submitAttempt
} from '../controllers/quizController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/generate', requireAuth, createQuiz);
router.post('/from-text', createQuizFromText);
router.get('/', requireAuth, listMyQuizzes);
router.post('/attempt', requireAuth, submitAttempt);

export default router;
