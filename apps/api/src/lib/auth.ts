import type { IncomingHttpHeaders } from 'node:http';
import type { TNewUser } from '@/types';
import { auth } from '@tawasul/auth/server';
import { fromNodeHeaders } from 'better-auth/node';

export async function getSession(headers: IncomingHttpHeaders) {
  return await auth.api.getSession({
    headers: fromNodeHeaders(headers),
  });
}

export async function createUser(user: TNewUser) {
  const newUser = await auth.api.signUpEmail({
    asResponse: true,
    body: user,
  });
  return newUser.headers.getSetCookie();
}
