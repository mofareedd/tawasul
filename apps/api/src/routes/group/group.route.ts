import authMiddleware from '@/middleware/auth.middleware';
import { schemaValidator } from '@/middleware/validator';
import { Router } from 'express';
import multer from 'multer';
import {
  createGroupHandler,
  findGroupByIdHandler,
  findManyGroupsHandler,
  joinGroupHandler,
} from './group.controller';
import { createGroupSchema, groupParamsSchema } from './group.validation';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const groupRoute = Router();
groupRoute
  .route('/')
  .get(findManyGroupsHandler)
  .post(
    authMiddleware,
    upload.array('media', 2),
    schemaValidator(createGroupSchema),
    createGroupHandler
  );

groupRoute
  .route('/:id')
  .get(schemaValidator(groupParamsSchema), findGroupByIdHandler);

groupRoute
  .route('/:id/join')
  .get(authMiddleware, schemaValidator(groupParamsSchema), joinGroupHandler);

export { groupRoute };
