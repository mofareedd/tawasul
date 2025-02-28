import authMiddleware from '@/middleware/auth.middleware';
import { schemaValidator } from '@/middleware/validator';
import { Router } from 'express';
import {
  createCommentHandler,
  deleteCommentHandler,
} from './comment.controller';
import { commentParamsSchema, createCommentSchema } from './comment.validation';

const commentRoute = Router();

commentRoute
  .route('/')
  .post(
    authMiddleware,
    schemaValidator(createCommentSchema),
    createCommentHandler
  );

commentRoute
  .route('/:id')
  .delete(
    authMiddleware,
    schemaValidator(commentParamsSchema),
    deleteCommentHandler
  );

export { commentRoute };
