import dotenv from 'dotenv';

dotenv.config();

import { auth } from '@tawasul/auth/server';
import { contract, createExpressEndpoints } from '@tawasul/contract';
import { db } from '@tawasul/db';
import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import express from 'express';
import { logger } from './lib/logger';
import { routes } from './routes';

const app = express();
app.all('/api/auth/*', toNodeHandler(auth));
app.get('/api/v1/records', async (req, res) => {
  await db.user.deleteMany();
  await db.session.deleteMany();
  await db.account.deleteMany();
  await db.verification.deleteMany();
  await db.post.deleteMany();
  await db.media.deleteMany();
  res.status(200).json({
    message: 'Deleted records',
  });
});
app.use(express.json());
app.use(cors());

createExpressEndpoints(contract, routes, app);

app.listen(1337, () => {
  logger.info('Server is running on port 1337');
});
