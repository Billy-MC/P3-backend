import app from './app';
import connectToDB from './database/mongodb';

connectToDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
