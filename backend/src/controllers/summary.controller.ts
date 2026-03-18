import { Request, Response, NextFunction } from 'express';

export const summarizeStory = async (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ summary: null });
};
