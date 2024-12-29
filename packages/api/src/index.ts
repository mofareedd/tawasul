import { initContract } from '@ts-rest/core';
import { fileContract } from './contract/file.contract';

const c = initContract();

export const contract = c.router(
  {
    files: fileContract,
  },
  {
    pathPrefix: '/api/v1',
  }
);
