import { initContract } from '@ts-rest/core';
import { zContractErrorResponse, zContractMessageResponse } from '../constant';

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
      query: z.object({
        skip: z.coerce.number().default(0),
        take: z.coerce.number().default(10),
      }),
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
        404: zContractErrorResponse,
      },
      summary: 'Create folder',
    },
    getById: {
      method: 'GET',
      path: '/folders/:id',
      pathParams: z.object({ id: z.coerce.string() }),
      responses: {
        200: folderSchema,
        404: zContractMessageResponse,
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
        404: zContractMessageResponse,
      },
      summary: 'Update folder by id',
    },
    remove: {
      method: 'DELETE',
      path: '/folders/:id',
      body: z.object({}),
      pathParams: z.object({ id: z.coerce.string() }),
      responses: {
        200: zContractMessageResponse,
        404: zContractMessageResponse,
      },
      summary: 'Delete folder by id',
    },
  },
  {
    strictStatusCodes: true,
  }
);
