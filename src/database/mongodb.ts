import mongoose from 'mongoose';
import logger from '../config/winston';

export default async () => {
  if (!process.env.CONNECTION_STRING) {
    logger.error('connection string not defined');
    process.exit(1);
  }
  const connectionString = process.env.CONNECTION_STRING;

  const connect = async (): Promise<void> => {
    try {
      await mongoose.connect(connectionString);
      logger.info(`Successfully connected to database: ${process.env.DB_NAME}, ${process.env.CONNECTION_STRING}`);
      return;
    } catch (error) {
      logger.error('Error connecting to database: ', error);
      process.exit(1);
    }
  };
  connect();

  mongoose.connection.on('disconnected', () => {
    logger.info('mongodb connection lost');
  });
};
