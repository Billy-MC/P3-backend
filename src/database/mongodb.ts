import mongoose from 'mongoose';

export default async () => {
  if (!process.env.CONNECTION_STRING) {
    console.error('connection string not defined');
    process.exit(1);
  }
  const connectionString = process.env.CONNECTION_STRING;

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
