import { STATUS } from '@/lib/constant';
import { HttpException } from '@/lib/exception';
import { db } from '@tawasul/db';
import type { CreateComment } from './comment.validation';

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
