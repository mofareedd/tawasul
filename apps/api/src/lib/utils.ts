import {} from 'zod';

export function isValidNumber(n: number | string) {
  return !Number.isNaN(n) && Number(n) > 0;
}
