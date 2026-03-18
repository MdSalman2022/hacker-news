import mongoose from 'mongoose';
import app from './app';
import env from './config/env';

const startServer = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('connected to mongodb');

    app.listen(env.port, () => {
      console.log(`backend running on port ${env.port}`);
    });
  } catch (err) {
    console.error('failed to start server:', err);
    process.exit(1);
  }
};

startServer();
