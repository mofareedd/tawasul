import express from 'express';
import client from 'prom-client';
import { logger } from './logger';

const metricsApp = express();
export function startMetricServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();
  metricsApp.get('/metrics', async (_req, res) => {
    res.set('Content-Type', client.register.contentType);

    const metrics = await client.register.metrics();
    res.send(metrics);
  });

  metricsApp.listen(9100, () => {
    logger.info('Metrics server started at http://localhost:9100');
  });
}
