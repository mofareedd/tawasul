import ky from 'ky';
const api = ky.extend({
  prefixUrl: 'http://localhost:1337/api',
  credentials: 'include',
});

export { api };
