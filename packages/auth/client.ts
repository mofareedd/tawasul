import {
  inferAdditionalFields,
  usernameClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import type { auth } from './server';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:1337',
  plugins: [usernameClient(), inferAdditionalFields<typeof auth>()],
});
