import { STATUS } from '@/lib/constant';
import { HttpException } from '@/lib/exception';
import { auth } from '@tawasul/auth/server';
import { fromNodeHeaders } from 'better-auth/node';
import type { NextFunction, Request, Response } from 'express';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session || !session.user) {
    throw new HttpException({
      message: 'Unauthorized',
      statusCode: STATUS.UNAUTHORIZED,
    });
  }

  req.user = session.user;
  next();
};

export default authMiddleware;
