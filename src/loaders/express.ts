import express from 'express';
import cors from 'cors';
import routes from '../routes/api/';
import config from '../config';

export default ({ app }: any) => {
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes());
  return app;
};
