import { Document } from '../models/Document.js';
import { Quiz } from '../models/Quiz.js';
import { QuizAttempt } from '../models/QuizAttempt.js';
import { generateQuizFromText } from '../services/aiService.js';

export const createQuiz = async (req, res) => {
  const {
    documentIds,
    questionCount = 10,
    difficulty = 'medium',
    topic = 'General',
    timeLimitMinutes = 15,
    randomized = true,
    types = ['mcq']
  } = req.body;

  const docs = await Document.find({ _id: { $in: documentIds || [] }, userId: req.user.id });
  if (!docs.length) {
    return res.status(400).json({ message: 'No valid documents found for quiz generation' });
  }

  const content = docs.map((d) => d.extractedText).join('\n\n');

  const generated = await generateQuizFromText({
    content,
    questionCount,
    difficulty,
    topic,
    types
  });

  const questions = randomized
    ? [...generated.questions].sort(() => Math.random() - 0.5)
    : generated.questions;

  const quiz = await Quiz.create({
    userId: req.user.id,
    documentIds,
    title: generated.title,
    difficulty,
    topic,
    timeLimitMinutes,
    randomized,
    questions
  });

  return res.status(201).json({ quiz });
};

export const createQuizFromText = async (req, res) => {
  const {
    studyText,
    questionCount = 10,
    difficulty = 'medium',
    topic = 'General',
    types = ['mcq']
  } = req.body;

  const generated = await generateQuizFromText({
    content: studyText,
    questionCount,
    difficulty,
    topic,
    types
  });

  return res.json({ quiz: generated });
};

export const listMyQuizzes = async (req, res) => {
  const quizzes = await Quiz.find({ userId: req.user.id }).sort({ createdAt: -1 });
  return res.json({ quizzes });
};

export const submitAttempt = async (req, res) => {
  const { quizId, answers } = req.body;
  const quiz = await Quiz.findOne({ _id: quizId, userId: req.user.id });
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

  const evaluated = answers.map((a) => {
    const q = quiz.questions[a.questionIndex];
    const isCorrect = q?.correctAnswer?.trim() === a.selectedAnswer?.trim();
    return { ...a, isCorrect };
  });

  const score = evaluated.filter((a) => a.isCorrect).length;

  const attempt = await QuizAttempt.create({
    userId: req.user.id,
    quizId,
    answers: evaluated,
    score,
    total: quiz.questions.length
  });

  return res.json({
    attempt,
    score,
    total: quiz.questions.length,
    correctAnswers: quiz.questions.map((q) => q.correctAnswer)
  });
};
