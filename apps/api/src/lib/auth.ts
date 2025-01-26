import type { IncomingHttpHeaders } from 'node:http';
import { auth } from '@tawasul/auth/server';
import { fromNodeHeaders } from 'better-auth/node';

export async function getSession(headers: IncomingHttpHeaders) {
  return await auth.api.getSession({
    headers: fromNodeHeaders(headers),
  });
}
