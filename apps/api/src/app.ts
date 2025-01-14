import dotenv from 'dotenv';

dotenv.config();

import { auth, toNodeHandler } from '@sandoq/auth';
import { contract, createExpressEndpoints } from '@sandoq/contract';
import { db } from '@sandoq/db';
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
  res.status(200).json({
    message: 'Deleted records',
  });
});
app.use(express.json());
app.use(cors());

createExpressEndpoints(contract, routes, app);

app.listen(1337, () => {
  logger.info('Server is running');
});
