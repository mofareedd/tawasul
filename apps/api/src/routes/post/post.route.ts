import authMiddleware from '@/middleware/auth.middleware';
import { schemaValidator } from '@/middleware/validator';
import { Router } from 'express';
import multer from 'multer';
import {
  bookmarkHandler,
  createPostHandler,
  deleteManyPostsHandler,
  deletePostHandler,
  findPostByIdHandler,
  findPostsHandler,
  likePostHandler,
  repostHandler,
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
  

postRoute.get("/clear", authMiddleware, deleteManyPostsHandler)

postRoute
  .route('/:id')
  .get(schemaValidator(postParamsSchema), findPostByIdHandler)
  .delete(authMiddleware, schemaValidator(postParamsSchema), deletePostHandler);

postRoute
  .route('/:id/like')
  .get(authMiddleware, schemaValidator(postParamsSchema), likePostHandler);

postRoute
  .route('/:id/repost')
  .get(authMiddleware, schemaValidator(postParamsSchema), repostHandler);

postRoute
  .route('/:id/bookmark')
  .get(authMiddleware, schemaValidator(postParamsSchema), bookmarkHandler);


  
export { postRoute };
