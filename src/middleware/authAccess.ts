import { Request, Response, NextFunction } from 'express';
import { jwtDecode } from '../utils/jwt';
import User from '../models/users.model';

const authRoute = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization as string;
  let token;
  if ((authHeader && authHeader.split(' ')[0] === 'Token') || (authHeader && authHeader.split(' ')[0] === 'Bearer')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'You are not logged in! Please login to get access' });
  }
  const decode = jwtDecode(token) as string;

  const currentUser = await User.findOne({ userId: decode.id });
  if (!currentUser) {
    return res.status(401).json({ error: 'The user belonging to this token does no longer exist' });
  }

  req.user = currentUser;
  return next();
};

const restrictTo =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'You do not have permission to perform this action' });
    }
    return next();
  };

export { authRoute, restrictTo };
