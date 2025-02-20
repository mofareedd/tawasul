import { zComments } from '@tawasul/validation';
import { z } from 'zod';
export const createCommentSchema = z.object({
  body: zComments,
});

export const commentParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateComment = z.infer<typeof createCommentSchema>;
export type CommentParamsInput = z.infer<typeof commentParamsSchema>;
