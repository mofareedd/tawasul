import { STATUS } from '@/lib/constant';
import type { Request, Response } from 'express';
import { createComment, deleteComment } from './comment.service';
import type { CommentParamsInput, CreateComment } from './comment.validation';

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

export const deleteCommentHandler = async (
  req: Request<CommentParamsInput['params']>,
  res: Response
) => {
  req.body;
  await deleteComment({ id: req.params.id, userId: req.user.id });
  res.status(STATUS.CREATED).json();
};
