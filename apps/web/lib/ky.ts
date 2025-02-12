import ky from 'ky';

const kyInstance = ky.extend({
  prefixUrl: 'http://localhost:1337/api',
  credentials: 'include',
});

export { kyInstance };
