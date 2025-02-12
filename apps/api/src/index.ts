import 'dotenv/config';

import { createApp } from './app';
import { env } from './lib/env';
import { logger } from './lib/logger';

const PORT = env.PORT;

// Start and listen to the server on the specified port
const server = createApp().listen(PORT, (e) => {
  if (e) {
    console.log('💥💥💥💥💥💥💥💥💥');
    console.log(e);
  }
  logger.info(`Server is running on port ${PORT}`);
});

function gracefullShutdown() {
  logger.info('Gracefully shutting down from SIGINT (Ctrl+C)...');

  // Gracefully close the server
  server.close(() => {
    logger.info('Server successfully closed. Exiting process.');
    process.exit(0);
  });

  // Forcefully exit after 10 seconds if the shutdown takes too long
  setTimeout(() => {
    logger.error('Forcing shutdown after 10 seconds timeout.');
    process.exit(1);
  }, 10000).unref(); // Allow process to exit naturally if no other events are active
}

// Handle SIGINT (Ctrl+C) and SIGTERM signals
process.on('SIGINT', gracefullShutdown);
process.on('SIGTERM', gracefullShutdown);
