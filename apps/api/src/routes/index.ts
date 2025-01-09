import { contract } from '@sandoq/contract';
import { initServer } from '@ts-rest/express';
import { postRouter } from './post/route';

export const routes = initServer().router(contract, {
  posts: postRouter,
});
