// import { createEnv } from '@t3-oss/env-nextjs';
import { createEnv } from '@t3-oss/env-core';
import { keys as auth } from '@tawasul/auth/keys';
import { keys as db } from '@tawasul/db/keys';
import { keys as email } from '@tawasul/email/keys';

export const env = createEnv({
  extends: [auth(), db(), email()],
  server: {},
  runtimeEnv: process.env,
  skipValidation: true,
});
