const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { connectToDB } = require('./utils/db');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
