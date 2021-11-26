import * as express from 'express';
import * as loader from './loaders';

const app = express();
loader.init(app);

module.exports = app;
