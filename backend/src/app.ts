import express from 'express';
import cors from 'cors';
import env from './config/env';
import errorHandler from './middleware/errorHandler';
import hnRoutes from './routes/hn.routes';
import bookmarkRoutes from './routes/bookmark.routes';
import summaryRoutes from './routes/summary.routes';

const app = express();

// parse json bodies
app.use(express.json());

// allow requests from the frontend
app.use(cors({ origin: env.frontendUrl }));

// routes
app.use('/api/hn', hnRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/summarize', summaryRoutes);

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// global error handler - must be last
app.use(errorHandler);

export default app;
