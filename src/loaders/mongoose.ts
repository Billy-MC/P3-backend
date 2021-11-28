import mongoose from 'mongoose';
import config from '../config';

export default async () => {
  let connectionString;
  if (process.env.NODE_ENV === 'production') {
    connectionString = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbDatabase}`;
  } else {
    connectionString = `mongodb://${process.env.DB_HOST}:${config.databasePort}/${config.databaseName}`;
  }

  console.log(connectionString);

  const connect = async () => {
    await mongoose
      .connect(connectionString)
      .then(() => console.log(`Successfully connected to database: ${process.env.DB_NAME}`))
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
