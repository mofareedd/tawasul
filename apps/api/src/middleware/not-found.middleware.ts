import { STATUS } from '@/lib/constant';
import { HttpException } from '@/lib/exception';
import type { NextFunction, Request, Response } from 'express';

export const notFound = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(
    new HttpException({
      message: `${req.originalUrl} not found!`,
      statusCode: STATUS.NOT_FOUND,
    })
  );
};
