import { auth } from '@tawasul/auth/server';
import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import express from 'express';
import { STATUS } from './lib/constant';
import { env } from './lib/env';
import { HttpException } from './lib/exception';
import { httpLogger } from './lib/logger';
import errorHandler from './middleware/error-handler';
import { routes } from './routes';
function createApp() {
  const app = express();

  app.use(
    cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Length'],
    })
  );

  app.all('/api/auth/*splat', toNodeHandler(auth));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (env.NODE_ENV === 'development') {
    app.use(httpLogger);
  }

  app.use('/api', routes);
  app.all('/*splat', (req, res, next) => {
    next(
      new HttpException({
        message: `${req.originalUrl} not found!`,
        statusCode: STATUS.NOT_FOUND,
      })
    );
  });
  app.use(errorHandler);

  return app;
}

export { createApp };
