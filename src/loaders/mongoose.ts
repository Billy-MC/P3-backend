import * as mongoose from 'mongoose';
import config from '../config';

export default async () => {
  let connectionString;
  if (process.env.NODE_ENV === 'production') {
    connectionString = config.databaseURL;
  } else {
    connectionString = `mongodb://${process.env.DB_HOST}:${config.databasePort}/${config.databaseName}`;
  }

  const db = mongoose.connection;
  db.on('connected', () => {
    console.log(connectionString);
    console.log(`Successfully connected to database: ${process.env.DB_NAME}`);
  });
  db.on('error', err => {
    console.log('Could not connect to db');
    console.error(err);
    process.exit(1);
  });
  db.on('disconnected', () => {
    console.log('mongoose connection is disconnected');
  });
  mongoose.connect(connectionString);
};
