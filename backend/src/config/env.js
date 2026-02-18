import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB || 10),
  maxFileCount: Number(process.env.MAX_FILE_COUNT || 5),
  maxPdfPages: Number(process.env.MAX_PDF_PAGES || 80),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
