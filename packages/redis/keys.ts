import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      UPSTASH_REDIS_URL: z.string().min(1).url().optional(),
      UPSTASH_REDIS_TOKEN: z.string().min(1).optional(),
    },
    experimental__runtimeEnv: process.env,
  });
