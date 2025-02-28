import { STATUS } from '@/lib/constant';
import type { Request, Response } from 'express';
import {
  createGroup,
  findGroupById,
  findManyGroups,
  joinGroup,
} from './group.service';
import type { CreateGroup, GroupParamsInput } from './group.validation';

export const findManyGroupsHandler = async (_req: Request, res: Response) => {
  const group = await findManyGroups();
  res.status(STATUS.OK).json(group);
};

export const createGroupHandler = async (
  req: Request<{}, {}, CreateGroup['body']>,
  res: Response
) => {
  const group = await createGroup({
    ...req.body,
    media: Array.isArray(req.files) && req.files.length > 0 ? req.files : [],
    userId: req.user.id,
  });

  res.status(STATUS.CREATED).json(group);
};

export const findGroupByIdHandler = async (
  req: Request<GroupParamsInput['params']>,
  res: Response
) => {
  const group = await findGroupById({ id: req.params.id });
  res.status(STATUS.OK).json(group);
};

export const joinGroupHandler = async (
  req: Request<GroupParamsInput['params']>,
  res: Response
) => {
  const joinedGroup = await joinGroup({
    id: req.params.id,
    userId: req.user.id,
  });

  res.status(STATUS.CREATED).json(joinedGroup);
};
