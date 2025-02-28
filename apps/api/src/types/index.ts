import type { auth } from '@tawasul/auth/server';

export type Session = typeof auth.$Infer.Session;

export type TNewUser = { name: string; email: string; password: string };
