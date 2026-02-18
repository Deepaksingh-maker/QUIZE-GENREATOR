import multer from 'multer';
import path from 'path';
import { env } from '../config/env.js';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
  }
});

const allowed = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
]);

export const upload = multer({
  storage,
  limits: { fileSize: env.maxFileSizeMb * 1024 * 1024, files: env.maxFileCount },
  fileFilter: (_, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const validExt = ['.pdf', '.docx', '.txt'].includes(ext);

    if (!allowed.has(file.mimetype) || !validExt) {
      return cb(new Error('Only PDF, DOCX, and TXT files are allowed'));
    }

    return cb(null, true);
  }
});
