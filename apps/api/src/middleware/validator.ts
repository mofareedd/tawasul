import { STATUS } from '@/lib/constant';
import type { NextFunction, Request, Response } from 'express';
import { type AnyZodObject, ZodError } from 'zod';

export const schemaValidator =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e: unknown) {
      let errors = e;
      if (e instanceof ZodError) {
        errors = e.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));
      }
      res.status(STATUS.BAD_REQUEST).send({ error: errors });
    }
  };
