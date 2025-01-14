import { keys as auth } from '@sandoq/auth/keys';
import { keys as db } from '@sandoq/db/keys';
import { keys as resend } from '@sandoq/resend/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [auth(), db(), resend()],
  server: {},
  client: {},
  runtimeEnv: {},
});
