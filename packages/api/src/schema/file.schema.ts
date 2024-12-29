import z from 'zod';

export const fileSchema = z.object({
  id: z.string(),
  title: z.string(),
  size: z.number(),
  fileType: z.string(),
  userId: z.string(),
  folderId: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
