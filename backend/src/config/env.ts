import dotenv from 'dotenv';

dotenv.config();

// all env vars live here - import from this file, never from process.env directly
const env = {
  port: process.env.PORT || '5000',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/hn-reader',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-flash-lite-latest',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default env;
