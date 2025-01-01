import { initContract } from '@ts-rest/core';
import { folderContract } from './folder.contract';

const c = initContract();

export const contract = c.router(
  {
    folders: folderContract,
  },
  {
    pathPrefix: '/api/v1',
  }
);
