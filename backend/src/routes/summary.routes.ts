import { Router } from 'express';
import { summarizeStory } from '../controllers/summary.controller';
import { summaryRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', summaryRateLimiter, summarizeStory);

export default router;
