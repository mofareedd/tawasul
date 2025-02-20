import z from 'zod';

export const zComments = z.object({
  content: z.string().max(200, 'Comment must be less than 200 characters'),
  postId: z.string().uuid(),
});

export type ZComments = z.infer<typeof zComments>;
