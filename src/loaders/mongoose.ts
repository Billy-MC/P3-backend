import mongoose from 'mongoose';
import * as mongoDB from 'mongodb';
import config from '../config';

export default async () => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.databaseURL);
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  console.log(`Successfully connected to database: ${db.databaseName}`);
  return;
};
