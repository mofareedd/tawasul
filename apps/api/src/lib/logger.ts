import dayjs from 'dayjs';
import type { Request } from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

const httpLogger = pinoHttp({
  logger: pino({
    transport: {
      target: 'pino-pretty',
    },
    base: {
      pid: false,
    },
  }),
  customSuccessMessage: (req, res) => {
    const request = req as Request;

    return `${request.ip} - ${request.method} ${request.originalUrl} ${res.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    const request = req as Request;
    return `${request.ip} - ${request.method} ${request.originalUrl} ${res.statusCode} -  Error: ${err.message}`;
  },
  serializers: {
    req: () => undefined, // Hides the req object
    res: () => undefined, // Hides the res object
    responseTime: () => undefined,
  },
});

export { logger, httpLogger };
