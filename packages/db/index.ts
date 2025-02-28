import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';
import { keys } from './keys';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'test'
      ? keys().TEST_DATABASE_URL
      : keys().DATABASE_URL,
});
const adapter = new PrismaNeon(pool);

export const db = new PrismaClient({ adapter });

export * from '@prisma/client';
