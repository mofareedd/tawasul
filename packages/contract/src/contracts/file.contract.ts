import { initContract } from '@ts-rest/core';

const c = initContract();

import z from 'zod';

export const fileSchema = z.object({
  id: z.string(),
  title: z.string(),
  size: z.number(),
  fileType: z.string(),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC').optional(),
  userId: z.string(),
  folderId: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const fileContract = c.router(
  {
    getAll: {
      method: 'GET',
      path: '/files',
      responses: {
        200: z.array(fileSchema),
      },
      summary: 'Get all the files',
    },
    create: {
      method: 'POST',
      path: '/files',
      body: fileSchema.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        url: true,
      }),
      responses: {
        201: fileSchema,
        404: z.object({ message: z.string() }),
      },
      summary: 'Create file',
    },
    getById: {
      method: 'GET',
      path: '/files/:id',
      pathParams: z.object({ id: z.coerce.string() }),
      responses: {
        200: fileSchema,
        404: z.object({ message: z.string() }),
      },
      summary: 'Get file by id',
    },
    update: {
      method: 'PATCH',
      path: '/files/:id',
      pathParams: z.object({ id: z.coerce.string() }),
      body: fileSchema
        .omit({
          id: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          url: true,
        })
        .partial(),
      responses: {
        201: fileSchema,
        404: z.object({ message: z.string() }),
      },
      summary: 'Update file by id',
    },
    remove: {
      method: 'DELETE',
      path: '/files/:id',
      body: z.object({}),
      pathParams: z.object({ id: z.coerce.string() }),
      responses: {
        200: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
      summary: 'Delete file by id',
    },
  },
  {
    strictStatusCodes: true,
  }
);
