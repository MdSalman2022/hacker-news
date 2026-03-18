import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import env from './config/env';
import errorHandler from './middleware/errorHandler';
import hnRoutes from './routes/hn.routes';
import bookmarkRoutes from './routes/bookmark.routes';
import summaryRoutes from './routes/summary.routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: env.frontendUrl }));

app.use('/api/hn', hnRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/summarize', summaryRoutes);

app.get('/health', (_req, res) => {
  const dbState = mongoose.connection.readyState;
  if (dbState !== 1) {
    res.status(503).json({ status: 'unhealthy', reason: 'db not connected' });
    return;
  }
  res.json({ status: 'healthy', db: 'connected' });
});

app.use(errorHandler);

export default app;
