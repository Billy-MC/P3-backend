import 'dotenv/config';
import { HttpError } from 'http-errors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from '@routes/api.route';
import indexRouter from '@routes/index.route';
import error404 from '@middleware/error-404';

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('./utils/swagger');

const app = express();

app.use(helmet());

const morganLog =
  process.env.NODE_ENV === 'development'
    ? morgan('dev')
    : morgan('common', {
        skip(req: Request, res: Response) {
          if (req.url === '/health') {
            return res.statusCode < 400;
          }
          return false;
        },
      });

app.use(morganLog);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    exposedHeaders: 'Authorization',
    origin: [
      'http://localhost:8000',
      'http://devils-frontend.s3-website-us-east-1.amazonaws.com',
      'https://www.devilscrm.link',
      'devilscrm.link',
      'http://localhost:3000',
    ],
    credentials: true,
  }),
);

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

app.use(error404);

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
