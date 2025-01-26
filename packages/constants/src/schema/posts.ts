import z from 'zod';

export const zPosts = z.object({
  id: z.string(),
  content: z.string(),
  userId: z.string().uuid(),
  media: z
    .array(
      z.object({
        url: z.string(),
        type: z.string(),
      })
    )
    .optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ZPosts = z.infer<typeof zPosts>;
