import jwt, { Secret } from 'jsonwebtoken';

export interface JwtPayload {
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

const jwtDecode = (token: string) => {
  const secret = process.env.JWT_SECRET as Secret;
  let decode;
  try {
    decode = jwt.verify(token, secret);
  } catch (err) {
    return decode;
  }
  return decode;
};
export { jwtEncode, jwtDecode };
