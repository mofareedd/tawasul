import type { IncomingHttpHeaders } from 'node:http';
import { auth, fromNodeHeaders } from '@sandoq/auth';

export async function getSession(headers: IncomingHttpHeaders) {
  return await auth.api.getSession({
    headers: fromNodeHeaders(headers),
  });
}
