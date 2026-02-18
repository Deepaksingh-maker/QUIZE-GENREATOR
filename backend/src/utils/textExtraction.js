import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { env } from '../config/env.js';

export const extractTextFromFile = async (file) => {
  if (file.mimetype === 'application/pdf') {
    const buffer = await fs.readFile(file.path);
    const data = await pdfParse(buffer);

    if (data.numpages > env.maxPdfPages) {
      throw new Error(`PDF page limit exceeded. Max allowed pages: ${env.maxPdfPages}`);
    }

    return { text: data.text || '', pageCount: data.numpages || 0 };
  }

  if (
    file.mimetype ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    const result = await mammoth.extractRawText({ path: file.path });
    return { text: result.value || '', pageCount: 0 };
  }

  if (file.mimetype === 'text/plain') {
    const raw = await fs.readFile(file.path, 'utf-8');
    return { text: raw, pageCount: 0 };
  }

  throw new Error(`Unsupported file type: ${file.mimetype}`);
};

export const basicTopicAnalysis = (text) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  const sentences = clean.split(/[.!?]/).filter(Boolean);
  const candidateConcepts = clean
    .match(/\b[A-Z][a-z]{3,}(?:\s[A-Z][a-z]{3,})*\b/g)
    ?.slice(0, 20) || [];

  const topics = Array.from(new Set(candidateConcepts)).slice(0, 8);
  const keyConcepts = sentences.slice(0, 10).map((s) => s.trim());

  return { topics, keyConcepts };
};
