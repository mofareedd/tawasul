import { createAuthClient } from 'better-auth/react';

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  forgetPassword,
  resetPassword,
} = createAuthClient({
  // baseURL: 'http://localhost:3000',
});
