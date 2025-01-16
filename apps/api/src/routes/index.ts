import { contract, initServer } from '@sandoq/contract';
import { postRouter } from './post/route';

export const routes = initServer().router(contract, {
  posts: postRouter,
});
