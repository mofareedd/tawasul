'use server';

import { auth } from '@tawasul/auth/server';

export const signIn = async () => {
  return await auth.api.signInEmail({
    body: {
      email: 'user@email.com',
      password: 'password',
    },
  });
};
