import { autoInjectable, container } from 'tsyringe';
import AbstractController from './util/abstract-controller';
import { NextFunction, Request, Response, Router } from 'express';
import { body, Result, ValidationChain, ValidationError, validationResult } from 'express-validator';
import { sort } from './sort';

@autoInjectable()
export class SortController extends AbstractController {
  constructor() {
    super();
  }

  sort = this.baseAction(async (req) => {
    const { width, height, length, mass } = req.body;
    return sort(parseFloat(width), parseFloat(height), parseFloat(length), parseFloat(mass));
  });
}

async function sortValidator(req: Request, res: Response, next: NextFunction) {
  const validations: ValidationChain[] = [
    body('width').exists({ checkNull: true }).isFloat({ gt: 0 }),
    body('height').exists({ checkNull: true }).isFloat({ gt: 0 }),
    body('length').exists({ checkNull: true }).isFloat({ gt: 0 }),
    body('mass').exists({ checkNull: true }).isFloat({ gt: 0 }),
  ];
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    return res.formatter.badRequest(errors);
  }
  next();
}

export const sortRouter = () => {
  const router = Router();
  const controller = container.resolve(SortController);

  router.post('/sort', sortValidator, controller.sort.bind(controller));

  return router;
};
