import dotenv from 'dotenv';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: process.env.PORT || 8000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,
  /**
   * API configs
   */
  api: {
    prefix: process.env.API_PREFIX || '/api/v1',
  },
};
