import { Router } from 'express';
import { getBookmarks, addBookmark, removeBookmark } from '../controllers/bookmark.controller';

const router = Router();

// get all bookmarks, optionally filtered by search query
router.get('/', getBookmarks);

// save a story as bookmark
router.post('/', addBookmark);

// remove a bookmark by hn story id
router.delete('/:hnId', removeBookmark);

export default router;
