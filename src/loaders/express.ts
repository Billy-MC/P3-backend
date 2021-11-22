import express from 'express';
import cors from 'cors';
import apiRouter from '../routes/api/v1/';
import config from '../config';

export default ({ app }: any) => {
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, apiRouter);
  return app;
};
