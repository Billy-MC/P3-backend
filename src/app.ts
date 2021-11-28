import 'dotenv/config';
import createError, { HttpError } from 'http-errors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/api.route';
import indexRouter from './routes/index.route';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
