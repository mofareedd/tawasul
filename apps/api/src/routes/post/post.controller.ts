import { STATUS } from '@/lib/constant';
import { isValidNumber } from '@/lib/utils';
import type { Request, Response } from 'express';
import {
  createPost,
  deletePost,
  findManyPosts,
  getPostsCount,
} from './post.service';
import type {
  CreatePost,
  PostParamsInput,
  PostQueryInput,
} from './post.validation';

export const getPostsHandler = async (
  req: Request<{}, {}, {}, PostQueryInput['query']>,
  res: Response
) => {
  const page =
    req.query?.page && isValidNumber(req.query.page)
      ? Number(req.query.page)
      : 1;

  const limit =
    req.query?.limit && isValidNumber(req.query.limit)
      ? Number(req.query.limit)
      : 10;

  const posts = await findManyPosts({
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalItems = await getPostsCount();

  const totalPages = Math.ceil(totalItems / limit);

  const result = {
    data: posts,
    totalItems,
    totalPages,
    currentPage: page,
    pageSize: limit,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
  };

  res.status(STATUS.OK).json({
    ...result,
  });
};

export const createPostHandler = async (
  req: Request<{}, {}, CreatePost['body']>,
  res: Response
) => {
  const post = await createPost({
    input: {
      ...req.body,
      media: Array.isArray(req.files) && req.files.length > 0 ? req.files : [],
      userId: req.user.id,
    },
  });

  res.status(STATUS.CREATED).json(post);
};

export const deletePostHandler = async (
  req: Request<PostParamsInput['params']>,
  res: Response
) => {
  const { id } = req.params;

  const deletedPost = await deletePost({
    input: {
      id,
      userId: req.user.id,
    },
  });
  res.status(STATUS.CREATED).json(deletedPost);
};
