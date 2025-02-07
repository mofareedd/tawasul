import type { PaginationResult } from '@/types/index';
import type { NextFunction, Request, Response } from 'express';
export const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const page = Number.parseInt(req.query.page as string) || 1;
  const limit = Number.parseInt(req.query.limit as string) || 10;

  req.pagination = {
    page,
    limit,
    skip: (page - 1) * limit,
    async getPaginationResult<T>(
      prismaModel: any,
      prismaQuery: any
    ): Promise<PaginationResult<T>> {
      const totalItems = await prismaModel.count({
        where: prismaQuery.where,
      });

      const totalPages = Math.ceil(totalItems / limit);

      const results = await prismaModel.findMany({
        ...prismaQuery,
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        data: results,
        metadata: {
          totalItems,
          totalPages,
          currentPage: page,
          pageSize: limit,
          hasNext: page < totalPages,
          hasPrevious: page > 1,
          nextPage: page < totalPages ? page + 1 : null,
          previousPage: page > 1 ? page - 1 : null,
        },
      };
    },
  };

  next();
};
