import z from 'zod';

export const zPathParams = z.object({ id: z.coerce.string() });

export const zPaginationQuery = z.object({
  // skip: z.coerce.number().default(0),
  // take: z.coerce.number().default(10),
  skip: z.string().default('0'),
  take: z.string().default('10'),
});

export type ZPaginationQuery = z.infer<typeof zPaginationQuery>;
