import { contract } from '@sandoq/contract';
import { createExpressEndpoints } from '@ts-rest/express';
import cors from 'cors';
import express from 'express';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

createExpressEndpoints(contract, routes, app);

app.listen(3000, () => {
  console.log('Server is running');
});
