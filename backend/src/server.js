import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';

const start = async () => {
  await connectDb();
  app.listen(env.port, () => {
    console.log(`🚀 API running on http://localhost:${env.port}`);
  });
};

start().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
