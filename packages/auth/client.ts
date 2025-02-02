import { usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  forgetPassword,
  resetPassword,
} = createAuthClient({
  baseURL: 'http://localhost:1337',
  plugins: [usernameClient()],
});
