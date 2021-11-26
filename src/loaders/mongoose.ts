import * as mongoDB from 'mongodb';
import config from '../config';

// console.log(config.databaseHost);
export default async () => {
  let connectionString;
  if (process.env.NODE_ENV === 'production') {
    connectionString = config.databaseURL;
  } else {
    connectionString = `mongodb://${process.env.DB_HOST}:${config.databasePort}/${config.databaseName}`;
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  console.log(connectionString);
  try {
    await client.connect();
    console.log(`Successfully connected to database: ${db.databaseName}`);
  } catch (error) {
    console.log('Could not connect to db');
    process.exit(1);
  }
  
};
