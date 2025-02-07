import type { auth } from '@tawasul/auth/server';

export type Session = typeof auth.$Infer.Session;

export interface PaginationResult<T> {
  data: T[];
  metadata: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
    nextPage: number | null;
    previousPage: number | null;
  };
}
