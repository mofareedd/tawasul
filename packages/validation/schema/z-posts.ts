import z from 'zod';

export const zPosts = z.object({
  content: z.string().max(200, 'Post must be less than 200 characters'),
  media: z
    .array(z.instanceof(File))
    .max(2, 'You can upload up to 4 images')
    .optional(),
});

export type ZPosts = z.infer<typeof zPosts>;
