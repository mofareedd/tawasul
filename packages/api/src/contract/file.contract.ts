import { initContract } from '@ts-rest/core';
import { fileSchema } from 'src/schema/file.schema';

const c = initContract();

import z from 'zod';

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
    delete: {
      method: 'DELETE',
      path: '/files/:id',
      pathParams: z.object({ id: z.coerce.string() }),
      responses: {
        204: z.object({}),
        404: z.object({ message: z.string() }),
      },
      summary: 'Delete file by id',
    },
  },
  {
    strictStatusCodes: true,
  }
);
