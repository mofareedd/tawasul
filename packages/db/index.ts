import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';
import { keys } from './keys';

neonConfig.webSocketConstructor = ws;

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaNeon(pool);

// export const db = new PrismaClient({ adapter });

export const setupDB = ({
  mode = 'dev',
}: { mode?: 'dev' | 'production' } = {}) =>
  new PrismaClient({
    adapter: new PrismaNeon(
      new Pool({
        connectionString:
          mode === 'dev' ? keys().DEV_DATABASE_URL : keys().DATABASE_URL,
      })
    ),
  });

export * from '@prisma/client';
