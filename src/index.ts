import Server from './app';
import Logger from './util/logger';
import { install } from 'source-map-support';

install();

const main = (): void => {
  process.on('unhandledRejection', (error) => {
    throw error;
  });

  process.on('uncaughtException', (error) => {
    Logger.error(error);

    process.exit(1);
  });

  const app = new Server();
  app.listen();
};

main();
