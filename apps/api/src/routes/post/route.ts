import authMiddleware from '@/middleware/auth-middleware';
import { schemaValidator } from '@/middleware/validator';
import { Router } from 'express';
import { createPostHandler, getPostsHandler } from './controller';
import { createPostSchema } from './validation';

const postRoute = Router();
postRoute
  .route('/')
  .get(getPostsHandler)
  .post(authMiddleware, schemaValidator(createPostSchema), createPostHandler);

export { postRoute };
