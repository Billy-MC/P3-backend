import jwt, { Secret } from 'jsonwebtoken';

export interface JwtPayload extends jwt.JwtPayload {
  id: string;
}

const jwtEncode = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET as Secret;
  const token = jwt.sign({ payload }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
  return token;
};

export { jwtEncode };
