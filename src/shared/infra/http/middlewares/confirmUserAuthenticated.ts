import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  userRoles: string;
}

export default function confirmAdminAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub, userRoles } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      userRoles,
    };

    // if (userRoles !== process.env.USER_ROLE) {
    //   throw new AppError('Not authorized!', 401);
    // }
    return next();
  } catch {
    throw new AppError('Not authorized!', 401);
  }
}
