import { initContract } from '@ts-rest/core';

const c = initContract();

import z from 'zod';

export const folderSchema = z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC').optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const folderContract = c.router(
  {
    getAll: {
      method: 'GET',
      path: '/folders',
      responses: {
        200: z.array(folderSchema),
      },
      summary: 'Get all the folders',
    },
    create: {
      method: 'POST',
      path: '/folders',
      body: folderSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      }),
      responses: {
        201: folderSchema,
        404: z.object({ message: z.string() }),
      },
      summary: 'Create folder',
    },
    getById: {
      method: 'GET',
      path: '/folders/:id',
      pathParams: z.object({ id: z.coerce.string() }),
      responses: {
        200: folderSchema,
        404: z.object({ message: z.string() }),
      },
      summary: 'Get folder by id',
    },
    update: {
      method: 'PATCH',
      path: '/folders/:id',
      pathParams: z.object({ id: z.coerce.string() }),
      body: folderSchema
        .omit({
          id: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
        })
        .partial(),
      responses: {
        201: folderSchema,
        404: z.object({ message: z.string() }),
      },
      summary: 'Update folder by id',
    },
    remove: {
      method: 'DELETE',
      path: '/folders/:id',
      body: z.object({}),
      pathParams: z.object({ id: z.coerce.string() }),
      responses: {
        200: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
      summary: 'Delete folder by id',
    },
  },
  {
    strictStatusCodes: true,
  }
);
