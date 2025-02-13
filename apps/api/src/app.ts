import { auth } from '@tawasul/auth/server';
import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import express from 'express';
import { corsConfig } from './lib/cors';
import { env } from './lib/env';
import { httpLogger } from './lib/logger';
import errorHandler from './middleware/error.middleware';
import { notFound } from './middleware/not-found.middleware';
import { routes } from './routes';
function createApp() {
  const app = express();

  app.use(cors(corsConfig));

  app.all('/api/auth/*splat', toNodeHandler(auth));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (env.NODE_ENV === 'development') {
    app.use(httpLogger);
  }

  app.use('/api', routes);
  app.all('/*splat', notFound);
  app.use(errorHandler);

  return app;
}

export { createApp };
