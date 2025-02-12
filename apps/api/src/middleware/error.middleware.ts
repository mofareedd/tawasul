import { STATUS } from '@/lib/constant';
import { env } from '@/lib/env';
import { HttpException } from '@/lib/exception';
import { logger } from '@/lib/logger';
import { Prisma } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';

function handlePrismaError(
  res: Response,
  error: Prisma.PrismaClientKnownRequestError
) {
  if (error.code === 'P2002') {
    res.status(STATUS.CONFLICT).json({
      error: {
        message: 'Resource already exists',
        status: 'fail',
      },
    });
  } else if (error.code === 'P2025') {
    res.status(STATUS.NOT_FOUND).json({
      error: {
        message: 'Resource not found',
        status: 'fail',
      },
    });
  } else {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      error: {
        message: 'Database error',
        status: 'fail',
      },
    });
  }
}
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
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({
    message: error.message,
    stack: error.stack,
    context: 'ErrorHandler',
  });

  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaError(res, error);
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
