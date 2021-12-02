import jwt, { Secret } from 'jsonwebtoken';

export interface JwtPayload extends jwt.JwtPayload {
  id: string;
  role: string;
}

const jwtEncode = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET as Secret;
  const token = jwt.sign({ payload }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
  return token;
};

const jwtDecode = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET as Secret;
  let decode;
  try {
    decode = jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    return decode as JwtPayload;
  }
  return decode;
};
export { jwtEncode, jwtDecode };
