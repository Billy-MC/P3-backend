import jwt, { Secret } from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  role: string;
}

const jwtEncode = (id: string, role: string) => {
  const secret = process.env.JWT_SECRET as Secret;
  const token = jwt.sign({ id, role }, secret, {
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
