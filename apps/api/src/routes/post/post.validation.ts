import { zPathParams, zPosts } from '@tawasul/validation';
import type { Express } from 'express';
import { z } from 'zod';
export const createPostSchema = z.object({
  body: zPosts.extend({
    media: z
      .array(z.custom<Express.Multer.File>())
      .max(2, 'You can upload up to 4 images')
      .optional(),
  }),
});

export const postParamsSchema = z.object({
  params: zPathParams,
});

export const postQuerySchema = z.object({
  query: z.object({
    limit: z.string().optional(),
    page: z.string().optional(),
  }),
});

export type CreatePost = z.infer<typeof createPostSchema>;
export type PostParamsInput = z.infer<typeof postParamsSchema>;
export type PostQueryInput = z.infer<typeof postQuerySchema>;
