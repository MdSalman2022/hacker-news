import mongoose from 'mongoose';
import app from './app';
import env from './config/env';

const startServer = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('connected to mongodb');

    const server = app.listen(env.port, () => {
      console.log(`backend running on port ${env.port}`);
    });

    const shutdown = async () => {
      console.log('shutting down gracefully...');
      server.close(async () => {
        await mongoose.disconnect();
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (err) {
    console.error('failed to start server:', err);
    process.exit(1);
  }
};

startServer();
