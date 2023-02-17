import { NextFunction, Request, Response } from "express";
import {} from "zod";
import { ZodTypeAny } from "zod/lib";

export const ensureDataIsValidMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validateData = schema.parse(req.body);
    req.body = validateData;

    return next();
  };
