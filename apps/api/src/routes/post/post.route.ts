import authMiddleware from '@/middleware/auth.middleware';
import { schemaValidator } from '@/middleware/validator';
import { Router } from 'express';
import multer from 'multer';
import {
  createPostHandler,
  deletePostHandler,
  findPostByIdHandler,
  findPostsHandler,
} from './post.controller';
import {
  createPostSchema,
  postParamsSchema,
  postQuerySchema,
} from './post.validation';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postRoute = Router();
postRoute
  .route('/')
  .get(schemaValidator(postQuerySchema), findPostsHandler)
  .post(
    authMiddleware,
    upload.array('media', 2),
    schemaValidator(createPostSchema),
    createPostHandler
  );

postRoute
  .route('/:id')
  .get(schemaValidator(postParamsSchema), findPostByIdHandler)
  .delete(authMiddleware, schemaValidator(postParamsSchema), deletePostHandler);

export { postRoute };
