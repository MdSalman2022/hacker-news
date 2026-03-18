import { Request, Response, NextFunction } from 'express';
import * as bookmarkService from '../services/bookmark.service';

export const getBookmarks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search = '', page = '1', limit = '20' } = req.query;
    const result = await bookmarkService.getBookmarks(
      search as string,
      parseInt(page as string),
      parseInt(limit as string)
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const addBookmark = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { hnId, title, url, author, points, commentCount, hnTime } = req.body;

    if (!hnId || !title || !author || !hnTime) {
      res.status(400).json({ error: 'missing required fields' });
      return;
    }

    const bookmark = await bookmarkService.addBookmark({
      hnId,
      title,
      url: url || null,
      author,
      points: points || 0,
      commentCount: commentCount || 0,
      hnTime,
    });

    res.status(201).json({ bookmark });
  } catch (err) {
    next(err);
  }
};

export const removeBookmark = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hnId = parseInt(req.params.hnId as string);
    if (isNaN(hnId)) {
      res.status(400).json({ error: 'invalid id' });
      return;
    }

    const deleted = await bookmarkService.removeBookmark(hnId);
    if (!deleted) {
      res.status(404).json({ error: 'bookmark not found' });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
