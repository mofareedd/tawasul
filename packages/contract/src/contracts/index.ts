import { initContract } from '@ts-rest/core';
import { postContract } from './post.contract';

const c = initContract();

export const contract = c.router(
  {
    posts: postContract,
  },
  {
    pathPrefix: '/api/v1',
  }
);

export { createExpressEndpoints, initServer } from '@ts-rest/express';
