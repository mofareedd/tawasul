import z from 'zod';

export const folderSchema = z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
