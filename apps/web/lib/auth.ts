import { auth } from '@tawasul/auth/server';
import { headers } from 'next/headers';

export async function currentUser() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
export async function logOut() {
  return await auth.api.signOut({
    headers: await headers(),
  });
}
