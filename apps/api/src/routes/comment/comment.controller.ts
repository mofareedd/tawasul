import { STATUS } from '@/lib/constant';
import type { Request, Response } from 'express';
import { createComment } from './comment.service';
import type { CreateComment } from './comment.validation';

export const createCommentHandler = async (
  req: Request<{}, {}, CreateComment['body']>,
  res: Response
) => {
  const newComment = await createComment({
    content: req.body.content,
    postId: req.body.postId,
    userId: req.user.id,
  });
  res.status(STATUS.CREATED).json(newComment);
};
