import { zPosts } from '@tawasul/validation';
import { z } from 'zod';

export const createPostSchema = z.object({
  body: zPosts,
});

export type CreatePost = z.infer<typeof createPostSchema>;
