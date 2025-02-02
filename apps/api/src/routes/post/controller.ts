import { STATUS } from '@/lib/constant';
// import {Post} from "@prisma/client"
import type { ZPaginationQuery } from '@tawasul/validation';
import type { Request, Response } from 'express';
import { createPost, getLatestPosts } from './service';
import type { CreatePost } from './validation';

export const getPostsHandler = async (
  req: Request<{}, {}, {}, ZPaginationQuery>,
  res: Response
) => {
  const { skip, take } = req.query;
  const posts = await getLatestPosts({ skip, take });
  res.status(STATUS.OK).json({
    posts,
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
