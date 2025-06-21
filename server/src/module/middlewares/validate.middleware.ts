import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }));
      res.status(400).json({ ok: false, type: "Validación fallida", errors });
      return;
    }
    req.body = result.data;
    next();
};

export default validate;