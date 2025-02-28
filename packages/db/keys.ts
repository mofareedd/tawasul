import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string().min(1).url(),
      TEST_DATABASE_URL: z.string().min(1).url(),
    },
    experimental__runtimeEnv: process.env,
  });
