import * as dotenv from 'dotenv';

process.env.NODE_ENV  = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: process.env.PORT || 8000,

  databaseURL: process.env.MONGODB_URI,

  api: {
    prefix: process.env.API_PREFIX || '/api/v1',
  },

  databaseHost: process.env.DB_HOST,

  databaseName: process.env.DB_DATABASE,

  databasePort: process.env.DB_PORT,

  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost:process.env.MONGODB_HOST,
  dbDatabase: process.env.MONGODB_DB

};
