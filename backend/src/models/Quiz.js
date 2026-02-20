import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['mcq', 'true_false', 'fill_blank'], required: true },
    question: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: String, required: true },
    explanation: { type: String }
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    topic: { type: String, default: 'General' },
    timeLimitMinutes: { type: Number, default: 15 },
    randomized: { type: Boolean, default: true },
    questions: [questionSchema]
  },
  { timestamps: true }
);

export const Quiz = mongoose.model('Quiz', quizSchema);
