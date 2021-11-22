import express from 'express';
const loader = require('./loaders');

const app = express();
loader.init(app);

module.exports = app;
