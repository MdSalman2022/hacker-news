import { Router } from 'express';
import { getStories, getStory } from '../controllers/hn.controller';

const router = Router();

// get list of stories (top, new, best)
router.get('/stories', getStories);

// get single story with comment tree
router.get('/story/:id', getStory);

export default router;
