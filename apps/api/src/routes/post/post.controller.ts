import { STATUS } from '@/lib/constant';
import { HttpException } from '@/lib/exception';
import { getPaginationMetadata, isValidNumber } from '@/lib/utils';
import type { TApiPaginationResponse } from '@tawasul/types';
import type { Request, Response } from 'express';
import {
  bookmark,
  createPost,
  deleteManyPosts,
  deletePost,
  findManyPosts,
  findPostById,
  getPostsCount,
  likePost,
  repost,
} from './post.service';
import type {
  CreatePost,
  PostParamsInput,
  PostQueryInput,
} from './post.validation';

export const findPostsHandler = async (
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
    userId: req.query?.userid ?? undefined,
  });
  const totalItems = await getPostsCount();

  const result: TApiPaginationResponse<typeof posts> = {
    data: posts,
    ...getPaginationMetadata({ limit, page, totalItems }),
  };

  res.status(STATUS.OK).json(result);
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

export const findPostByIdHandler = async (
  req: Request<PostParamsInput['params']>,
  res: Response
) => {
  const { id } = req.params;

  const post = await findPostById({
    id,
  });
  res.status(STATUS.OK).json(post);
};

export const deletePostHandler = async (
  req: Request<PostParamsInput['params']>,
  res: Response
) => {
  const { id } = req.params;

  const deletedPost = await deletePost({
    id,
    userId: req.user.id,
  });
  res.status(STATUS.CREATED).json(deletedPost);
};

export const likePostHandler = async (
  req: Request<PostParamsInput['params']>,
  res: Response
) => {
  const { id } = req.params;

  const likedPost = await likePost({
    id,
    userId: req.user.id,
  });

  res.status(STATUS.CREATED).json(likedPost);
};

export const repostHandler = async (
  req: Request<PostParamsInput['params']>,
  res: Response
) => {
  const { id } = req.params;

  const likedPost = await repost({
    id,
    userId: req.user.id,
  });

  res.status(STATUS.CREATED).json(likedPost);
};

export const bookmarkHandler = async (
  req: Request<PostParamsInput['params']>,
  res: Response
) => {
  const { id } = req.params;

  const likedPost = await bookmark({
    id,
    userId: req.user.id,
  });

  res.status(STATUS.CREATED).json(likedPost);
};

export const deleteManyPostsHandler = async (req: Request, res: Response) => {
  if (req.user.email !== 'm.alaolaqi1417@gmail.com') {
    throw new HttpException({
      message: 'Unauthorized',
      statusCode: STATUS.UNAUTHORIZED,
    });
  }

  await deleteManyPosts();

  res.status(STATUS.CREATED).json({ message: 'All Posts deleted' });
};
