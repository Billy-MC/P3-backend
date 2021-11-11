require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { connectToDB } = require('./utils/db');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', routes);

connectToDB();

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
