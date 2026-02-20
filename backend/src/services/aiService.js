import OpenAI from 'openai';
import { z } from 'zod';
import { env } from '../config/env.js';

const QuestionSchema = z.object({
  type: z.enum(['mcq', 'true_false', 'fill_blank']),
  question: z.string().min(10),
  options: z.array(z.string()).min(2).max(4),
  correctAnswer: z.string().min(1),
  explanation: z.string().min(5)
});

const QuizSchema = z.object({
  title: z.string(),
  questions: z.array(QuestionSchema).min(1)
});

const client = new OpenAI({ apiKey: env.openAiApiKey || 'no-key' });

export const buildQuizPrompt = ({ content, questionCount, difficulty, topic, types }) => `
You are an expert instructional designer.
Generate a conceptual quiz from the study material.

Rules:
- Return STRICT JSON only, no markdown.
- Difficulty: ${difficulty}
- Topic focus: ${topic || 'General'}
- Question count: ${questionCount}
- Allowed types: ${types.join(', ')}
- For mcq: exactly 4 options and 1 correct answer.
- Avoid copy-paste from source; test understanding.
- Include concise explanation for each answer.

JSON format:
{
  "title": "...",
  "questions": [
    {
      "type": "mcq|true_false|fill_blank",
      "question": "...",
      "options": ["..."],
      "correctAnswer": "...",
      "explanation": "..."
    }
  ]
}

Study Material:
${content.slice(0, 24000)}
`;

export const generateQuizFromText = async (params) => {
  if (!env.openAiApiKey) {
    throw new Error('OPENAI_API_KEY not configured.');
  }

  const prompt = buildQuizPrompt(params);

  const completion = await client.chat.completions.create({
    model: env.openAiModel,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.4,
    response_format: { type: 'json_object' }
  });

  const raw = completion.choices?.[0]?.message?.content;
  if (!raw) {
    throw new Error('No response from AI model');
  }

  const parsed = QuizSchema.parse(JSON.parse(raw));
  return parsed;
};
