import rateLimit from 'express-rate-limit';
import env from '../config/env';

export const summaryRateLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  message: { error: 'too many summarize requests, please wait a minute' },
  standardHeaders: false,
  legacyHeaders: false,
});
