import * as express from 'express';
import * as cors from 'cors';
import apiRoutes from "../routes/api/index";
import config from '../config';

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, apiRoutes());
};
