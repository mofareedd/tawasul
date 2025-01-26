import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      RESEND_FROM: z.string().min(1).email().optional(),
      RESEND_TOKEN: z.string().min(1).startsWith('re_'),
    },
    experimental__runtimeEnv: process.env,
    skipValidation: true,
  });
