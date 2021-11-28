import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

const error404 = (req: Request, res: Response, next: NextFunction): void => {
  next(createError(404));
};

export default error404;
