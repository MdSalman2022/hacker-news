import { Request, Response, NextFunction } from 'express';

export const getStories = async (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ stories: [], total: 0 });
};

export const getStory = async (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ story: null, comments: [] });
};
