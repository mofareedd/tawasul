import { contract } from '@tawasul/contract';
import { initTsrReactQuery } from '@ts-rest/react-query/v5';

export const tsr = initTsrReactQuery(contract, {
  baseUrl: 'http://localhost:1337',
});
