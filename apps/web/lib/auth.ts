import { auth } from '@sandoq/auth';
import { headers } from 'next/headers';

export async function currentUser() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
