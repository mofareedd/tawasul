// import { createEnv } from '@t3-oss/env-nextjs';
import { createEnv } from '@t3-oss/env-core';
import { keys as auth } from '@tawasul/auth/keys';
import { keys as db } from '@tawasul/db/keys';
import { keys as email } from '@tawasul/email/keys';
import { z } from 'zod';

export const env = createEnv({
  extends: [auth(), db(), email()],
  server: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.number().default(1337),
  },
  runtimeEnv: process.env,
  skipValidation: true,
});
