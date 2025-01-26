import { contract, initServer } from '@tawasul/contract';
import { postRouter } from './post/route';

export const routes = initServer().router(contract, {
  posts: postRouter,
});
