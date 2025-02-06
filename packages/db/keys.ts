import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string().min(1).url(),
      DEV_DATABASE_URL: z.string().min(1).url().optional(),
    },
    experimental__runtimeEnv: process.env,
    skipValidation: true,
  });
