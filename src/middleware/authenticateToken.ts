import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import createHttpError from 'http-errors';
import logger from '../utils/logger';

interface TokenPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const authenticateToken = (role: string = '') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return next(createHttpError(401, 'No token provided'));
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
      ) as TokenPayload;
      const user = await User.findById(decoded.userId);

      if (!user) {
        return next(createHttpError(403, 'User not found'));
      }

      if (role && user.role !== role) {
        return next(createHttpError(403, 'Action unauthorized'));
      }

      req.user = user;
      next();
    } catch (error) {
      logger.error('Error in token authentication:', error);
      next(createHttpError(403, 'Invalid or expired token'));
    }
  };
};
