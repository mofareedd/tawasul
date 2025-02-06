import type { IncomingHttpHeaders } from 'node:http';
import { auth } from '@tawasul/auth/server';
import { fromNodeHeaders } from 'better-auth/node';

export async function getSession(headers: IncomingHttpHeaders) {
  return await auth.api.getSession({
    headers: fromNodeHeaders(headers),
  });
}

export async function createUser({
  email,
  name,
  password,
}: { email: string; name: string; password: string }) {
  return await auth.api.signUpEmail({
    asResponse: true,
    body: { email, password, name },
  });
}
