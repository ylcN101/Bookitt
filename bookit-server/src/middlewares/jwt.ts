import jwt from 'jsonwebtoken';
import createError from '../utils/createError';

export const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: 86400 * 30,
  });
};

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.cookies.accessToken;
  console.log('token:', token);
  if (!token) return next(createError(401, 'Unauthorized'));
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, payload: any) => {
      if (err) {
        return next(createError(401, 'Unauthorized'));
      }
      req.userId = payload.id;
      next();
    }
  );
};
