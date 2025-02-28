import { STATUS } from '@/lib/constant';
import { HttpException } from '@/lib/exception';
import { db } from '@tawasul/db';
import type { CommentParamsInput, CreateComment } from './comment.validation';

export async function createComment(
  input: CreateComment['body'] & { userId: string }
) {
  const isPostExisted = await db.post.findFirst({
    where: {
      id: input.postId,
    },
  });

  if (!isPostExisted) {
    throw new HttpException({
      message: 'Post not found',
      statusCode: STATUS.NOT_FOUND,
    });
  }

  return await db.comment.create({
    data: {
      content: input.content,
      postId: input.postId,
      userId: input.userId,
    },
  });
}

export async function deleteComment(
  input: CommentParamsInput['params'] & { userId: string }
) {
  const isCommentExisted = await db.comment.findFirst({
    where: {
      id: input.id,
    },
  });

  if (!isCommentExisted) {
    throw new HttpException({
      message: 'Comment not found',
      statusCode: STATUS.NOT_FOUND,
    });
  }

  if (isCommentExisted.userId !== input.userId) {
    throw new HttpException({
      message: 'Unauthorized',
      statusCode: STATUS.UNAUTHORIZED,
    });
  }

  return await db.comment.delete({
    where: {
      id: input.id,
    },
  });
}
