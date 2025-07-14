import 'reflect-metadata';
import express, { Application, Router } from 'express';
import { responseEnhancer } from 'express-response-formatter';
import morganMiddleware from './util/morgan';
import cookieParser from 'cookie-parser';
import Logger from './util/logger';
import { errorHandlerMiddleware } from './util/error-handler-middleware';
import { sortRouter } from './controller';

export default class Server {
  private app: Application;

  constructor(private port?: number) {
    this.app = express();

    this.config();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  config() {
    this.app.set('port', process.env.PORT || 3000);
    this.app.set('trust proxy', true);
    this.app.disable('x-powered-by');
  }

  middlewares() {
    this.app.use(express.json({ limit: '5mb' }));
    this.app.use(responseEnhancer());
    this.app.use(morganMiddleware);
    this.app.use(cookieParser());
  }

  errorHandler() {
    this.app.use(errorHandlerMiddleware());
  }

  routes() {
    const router = Router();
    router.use(sortRouter());
    this.app.use(router);
  }

  listen() {
    this.app.listen(this.app.get('port'), () => {
      Logger.info(`Server running on port: ${this.app.get('port')}`);
    });
  }
}
