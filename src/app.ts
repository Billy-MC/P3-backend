import 'dotenv/config';
import { HttpError } from 'http-errors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/api.route';
import indexRouter from './routes/index.route';
import error404 from './middleware/error-404';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', indexRouter);
app.use('/api', apiRouter);
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
