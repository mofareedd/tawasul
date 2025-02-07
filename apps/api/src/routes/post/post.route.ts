import authMiddleware from '@/middleware/auth.middleware';
import { paginationMiddleware } from '@/middleware/pagination.middleware';
import { schemaValidator } from '@/middleware/validator';
import { Router } from 'express';
import { createPostHandler, getPostsHandler } from './post.controller';
import { createPostSchema } from './post.validation';

const postRoute = Router();
postRoute
  .route('/')
  .get(paginationMiddleware, getPostsHandler)
  .post(authMiddleware, schemaValidator(createPostSchema), createPostHandler);

export { postRoute };
