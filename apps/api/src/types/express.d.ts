import type { auth } from '@tawasul/auth/server';
import type { PaginationResult } from './index';

type Session = typeof auth.$Infer.Session;
declare global {
  namespace Express {
    interface Request {
      user: Session['user']; // Add user to the Request interface
      pagination?: {
        page: number;
        limit: number;
        skip: number;
        getPaginationResult<T>(
          prismaModel: unknown,
          prismaQuery: unknown
        ): Promise<PaginationResult<T>>;
      };
    }
  }
}
