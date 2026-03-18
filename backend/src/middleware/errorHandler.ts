import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'validation failed',
      details: err.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`),
    });
    return;
  }

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'something went wrong';
  console.error(`[${status}] ${message}`, err.stack);
  res.status(status).json({ error: message });
};

export default errorHandler;
