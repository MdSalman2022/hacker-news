import { Request, Response, NextFunction } from 'express';

// catches any unhandled errors and sends a clean response
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack || err.message);

  const status = err.status || 500;
  const message = err.message || 'something went wrong';

  res.status(status).json({ error: message });
};

export default errorHandler;
