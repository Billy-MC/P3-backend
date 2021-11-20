const cors = require('cors');
const express = require('express');
const loader = require('./src/loaders');
const router = require('./src/routes/v1/api/index.js');
// const customerRouter = require('./src/routes/v1/api/customerRoutes.js');

const app = express();

loader.init(app);

module.exports = app;
