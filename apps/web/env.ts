import { createEnv } from '@t3-oss/env-nextjs';
import { keys as auth } from '@tawasul/auth/keys';
import { keys as db } from '@tawasul/db/keys';

export const env = createEnv({
  extends: [auth(), db()],
  server: {},
  client: {},
  runtimeEnv: {},
});
