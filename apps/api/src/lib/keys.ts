// import { createEnv } from '@t3-oss/env-core';
// import { z } from 'zod';

// export const keys = () =>
//   createEnv({
//     server: {
//       DATABASE_URL: z.string().min(1),
//       GOOGLE_CLIENT_ID: z.string().min(1),
//       GOOGLE_CLIENT_SECRET: z.string().min(1),
//       BETTER_AUTH_SECRET: z.string().min(1),
//       RESEND_TOKEN: z.string().min(1),
//     },
//     runtimeEnv: {
//       DATABASE_URL: process.env.DATABASE_URL,
//       GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//       GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
//       RESEND_TOKEN: process.env.RESEND_TOKEN,
//       BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
//     },
//   });

import { keys as auth } from '@tawasul/auth/keys';
import { keys as db } from '@tawasul/db/keys';
import { keys as resend } from '@tawasul/resend/keys';
import { createEnv } from '@t3-oss/env-core';

export const env = createEnv({
  extends: [auth(), db(), resend()],
  server: {},
  runtimeEnv: {},
});
