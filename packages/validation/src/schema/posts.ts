import z from 'zod';

export const zPosts = z.object({
  content: z.string(),
  media: z
    .array(
      z.object({
        url: z.string(),
        type: z.string(),
      })
    )
    .optional(),
});

export type ZPosts = z.infer<typeof zPosts>;
