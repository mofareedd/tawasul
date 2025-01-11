import { contract } from '@sandoq/contract';
// client.ts
import { initQueryClient } from '@ts-rest/react-query';

// `contract` is the AppRouter returned by `c.router`
export const client = initQueryClient(contract, {
  baseUrl: 'http://localhost:3333',
  baseHeaders: {},
});
