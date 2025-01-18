import { keys as auth } from '@tawasul/auth/keys';
import { keys as db } from '@tawasul/db/keys';
import { keys as resend } from '@tawasul/resend/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [auth(), db(), resend()],
  server: {},
  client: {},
  runtimeEnv: {},
});
