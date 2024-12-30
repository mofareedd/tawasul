import { initContract } from '@ts-rest/core';
import { fileContract } from './file.contract';
import { folderContract } from './folder.contract';

const c = initContract();

export const contract = c.router(
  {
    files: fileContract,
    folders: folderContract,
  },
  {
    pathPrefix: '/api/v1',
  }
);
