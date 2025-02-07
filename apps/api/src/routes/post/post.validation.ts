import { zPosts } from '@tawasul/validation';
import { z } from 'zod';

export const createPostSchema = z.object({
  body: zPosts,
});

export const postQuerySchema = z.object({
  query: z.object({
    limit: z.string().optional(),
    page: z.string().optional(),
  }),
  // body: z.object({}).optional(),
  // params: z.object({}).optional(),
});

export type CreatePost = z.infer<typeof createPostSchema>;
export type PostQueryInput = z.infer<typeof postQuerySchema>;
