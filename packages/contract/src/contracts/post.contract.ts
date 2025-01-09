import {
  zContractErrorResponse,
  zContractMessageResponse,
  zPathParams,
  zPosts,
  zQueryParams,
} from '@sandoq/constants';
import type { Post, Prisma } from '@sandoq/db';
import { initContract } from '@ts-rest/core';
import z from 'zod';
const c = initContract();

type PostUser = Prisma.PostGetPayload<{
  include: {
    user: true;
  };
}>;

export const postContract = c.router(
  {
    getAll: {
      method: 'GET',
      path: '/',
      responses: {
        200: c.type<{ posts: PostUser[] }>(),
      },
      query: zQueryParams,
      summary: 'Get all the posts',
    },
    create: {
      method: 'POST',
      path: '/',
      body: zPosts.omit({
        id: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      }),
      responses: {
        201: c.type<Post>(),
        404: zContractErrorResponse,
      },
      summary: 'Create post',
    },
    getById: {
      method: 'GET',
      path: '/:id',
      pathParams: zPathParams,
      responses: {
        200: c.type<PostUser>(),
        404: zContractErrorResponse,
      },
      summary: 'Get post by id',
    },
    remove: {
      method: 'DELETE',
      path: '/:id',
      body: z.object({}),
      pathParams: zPathParams,
      responses: {
        200: zContractMessageResponse,
        404: zContractErrorResponse,
      },
      summary: 'Delete post by id',
    },
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/posts',
  }
);
