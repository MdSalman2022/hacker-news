import { Router } from 'express';
import { summarizeStory } from '../controllers/summary.controller';

const router = Router();

// generate or return cached ai summary for a story
router.post('/', summarizeStory);

export default router;
