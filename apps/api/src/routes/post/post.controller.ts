import { STATUS } from '@/lib/constant';
import type { Request, Response } from 'express';
import { createPost, getLatestPosts, getPostsCount } from './post.service';
import type { CreatePost, PostQueryInput } from './post.validation';

export const getPostsHandler = async (
  req: Request<{}, {}, {}, PostQueryInput['query']>,
  res: Response
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const posts = await getLatestPosts({
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
    input: { ...req.body, userId: req.user.id },
  });

  res.status(STATUS.CREATED).json(post);
};
