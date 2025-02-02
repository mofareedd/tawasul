import { z } from 'zod';

export const createPostInput = z.object({
  content: z.string(),
  images: z.array(z.instanceof(File)).optional(),
});

export type CreatePostInput = z.infer<typeof createPostInput>;
