import { Request, Response, NextFunction } from 'express';

export const getBookmarks = async (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ bookmarks: [], total: 0 });
};

export const addBookmark = async (_req: Request, res: Response, _next: NextFunction) => {
  res.status(201).json({ bookmark: null });
};

export const removeBookmark = async (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ success: true });
};
