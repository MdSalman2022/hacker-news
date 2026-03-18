import { Request, Response, NextFunction } from 'express';
import * as hnService from '../services/hn.service';

export const getStories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type = 'top', page = '1', limit = '20' } = req.query;
    const result = await hnService.getStoriesByPage(
      type as string,
      parseInt(page as string),
      parseInt(limit as string)
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
      res.status(400).json({ error: 'invalid story id' });
      return;
    }

    const result = await hnService.getStoryWithComments(id);
    if (!result) {
      res.status(404).json({ error: 'story not found' });
      return;
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};
