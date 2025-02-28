import { zGroups } from '@tawasul/validation';
import type { Express } from 'express';
import { z } from 'zod';
export const createGroupSchema = z.object({
  body: zGroups.extend({
    media: z
      .array(z.custom<Express.Multer.File>())
      .max(1, 'You can upload up to 1 images')
      .optional(),
  }),
});

export const groupParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateGroup = z.infer<typeof createGroupSchema>;
export type GroupParamsInput = z.infer<typeof groupParamsSchema>;
