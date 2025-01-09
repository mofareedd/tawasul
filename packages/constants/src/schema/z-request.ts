import z from 'zod';

export const zPathParams = z.object({ id: z.coerce.string() });

export const zQueryParams = z.object({
  skip: z.coerce.number().default(0),
  take: z.coerce.number().default(10),
});
