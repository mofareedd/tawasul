import { auth, toNodeHandler } from '@sandoq/auth';
import { contract } from '@sandoq/contract';
import { createExpressEndpoints } from '@ts-rest/express';
import cors from 'cors';
import express from 'express';
import { logger } from './lib/logger';
import { routes } from './routes';

const app = express();

app.all('/api/auth/*', toNodeHandler(auth));
app.use(express.json());
app.use(cors());

createExpressEndpoints(contract, routes, app);

app.listen(1337, () => {
  logger.info('Server is running');
});
