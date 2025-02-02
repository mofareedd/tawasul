import { env } from '@/lib/env';
import { HttpException } from '@/lib/exception';
import type { NextFunction, Request, Response } from 'express';

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An error occurred';
}

export default function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof HttpException) {
    let err: Record<string, unknown> = {
      message: error.message,
      status: error.status,
    };

    if (env.NODE_ENV === 'development') {
      err = { ...err, stack: error.stack };
    }

    res.status(error.statusCode).json({
      error: err,
    });

    return;
  }

  res.status(500).json({
    error: {
      message:
        getErrorMessage(error) ||
        'An error occurred. Please view logs for more details',
      status: 'fail',
    },
  });
}
