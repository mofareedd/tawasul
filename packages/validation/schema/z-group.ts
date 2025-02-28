import z from 'zod';

export const zGroups = z.object({
  name: z.string().max(50, 'Group name must be less than 50 characters'),
  description:z.string().max(200, 'Group description must be less than 200 characters'),
  media: z
    .array(z.instanceof(File))
    .max(1, 'You can upload up to 1 images')
    .optional(),
});

export type ZGroups = z.infer<typeof zGroups>;
