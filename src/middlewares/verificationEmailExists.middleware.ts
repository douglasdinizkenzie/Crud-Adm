import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database/config";
import { AppError } from "../error";

export const verificationEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const queryStringVerifyEmail: string = `
    SELECT *
    FROM users
    WHERE email = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryStringVerifyEmail,
    values: [req.body.email],
  };

  const QueryResultVerifyEmail: QueryResult = await client.query(queryConfig);

  if (QueryResultVerifyEmail.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};
