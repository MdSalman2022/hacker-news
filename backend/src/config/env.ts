import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: process.env.PORT || '5000',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/hn-reader',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-flash-lite-latest',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
  hnBaseUrl: process.env.HN_BASE_URL || 'https://hacker-news.firebaseio.com/v0',
  commentMaxDepth: parseInt(process.env.COMMENT_MAX_DEPTH || '2'),
  commentTopLimit: parseInt(process.env.COMMENT_TOP_LIMIT || '50'),
  commentNestedLimit: parseInt(process.env.COMMENT_NESTED_LIMIT || '20'),
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '5'),
};

export default env;
