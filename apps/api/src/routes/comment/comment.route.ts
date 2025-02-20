import authMiddleware from '@/middleware/auth.middleware';
import { schemaValidator } from '@/middleware/validator';
import { Router } from 'express';
import { createCommentHandler } from './comment.controller';
import { createCommentSchema } from './comment.validation';

const commentRoute = Router();

commentRoute
  .route('/')
  .post(
    authMiddleware,
    schemaValidator(createCommentSchema),
    createCommentHandler
  );

export { commentRoute };
