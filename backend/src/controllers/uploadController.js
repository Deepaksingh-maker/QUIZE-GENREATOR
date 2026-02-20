import { Document } from '../models/Document.js';
import { basicTopicAnalysis, extractTextFromFile } from '../utils/textExtraction.js';

export const uploadFiles = async (req, res) => {
  if (!req.files?.length) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  const docs = [];

  for (const file of req.files) {
    const { text, pageCount } = await extractTextFromFile(file);

    if (!text.trim()) {
      throw new Error(`Unreadable/empty file content: ${file.originalname}`);
    }

    const analysis = basicTopicAnalysis(text);

    const doc = await Document.create({
      userId: req.user.id,
      originalName: file.originalname,
      mimeType: file.mimetype,
      storagePath: file.path,
      pageCount,
      extractedText: text,
      topics: analysis.topics,
      keyConcepts: analysis.keyConcepts
    });

    docs.push(doc);
  }

  return res.status(201).json({ documents: docs });
};

export const getMyUploads = async (req, res) => {
  const docs = await Document.find({ userId: req.user.id }).sort({ createdAt: -1 });
  return res.json({ documents: docs });
};
