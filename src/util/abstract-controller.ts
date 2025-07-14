import { NextFunction, Request, Response } from 'express';

export default class AbstractController {
  constructor() {}

  protected baseAction<T>(
    body: (req: Request) => Promise<T>,
  ): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await body(req);
        res.formatter.ok(result);
      } catch (error: any) {
        next(error);
      }
    };
  }
}
