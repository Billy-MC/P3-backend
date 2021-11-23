import mongoose from 'mongoose';
import * as mongoDB from 'mongodb';
import config from '../config';
// console.log(config.databaseHost);
export default async () => {
  let connectionString;
  if (process.env.NODE_ENV === 'production') {
    if (process.env.DB_USER && process.env.DB_PASSWORD) connectionString = config.databaseURL;
  } else {
    // console.log(config.databaseHost);
    connectionString = `mongodb://${process.env.DB_HOST}:${config.databasePort}/${config.databaseName}`;
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  try {
    await client.connect();
    console.log(`Successfully connected to database: ${db.databaseName}`);
  } catch (error) {
    console.log('Could not connect to db');
    process.exit(1);
  }
};
