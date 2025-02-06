import { setupDB } from '@tawasul/db';
import { env } from './env';

export const db = setupDB(
  env.NODE_ENV === 'production' ? env.DATABASE_URL : env.DEV_DATABASE_URL
);
