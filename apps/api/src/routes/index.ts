import { contract } from '@sandoq/contract';
import { folderContract } from '@sandoq/contract/src/contracts/folder.contract';
import { initServer } from '@ts-rest/express';

export const routes = initServer().router(contract, {
  folders: folderContract,
});
