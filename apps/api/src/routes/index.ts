import { contract } from '@sandoq/contract';
import { initServer } from '@ts-rest/express';
import { folderRouter } from './folder/route';

export const routes = initServer().router(contract, {
  folders: folderRouter,
});
