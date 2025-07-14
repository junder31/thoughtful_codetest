import { NextFunction, Request, Response } from 'express';
import { UserError } from './errors';
import methods from 'express-response-formatter/lib/methods';
import Logger from './logger';
export const errorHandlerMiddleware = () => {
  return (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof UserError) {
      const method = methods.find((m) => parseInt(m.code) === error.statusCode);
      if (method) {
        res.formatter[method.name](error.message);
        return;
      }
    }

    Logger.error(error);
    res.formatter['serverError']('Internal Server Error');
  };
};
