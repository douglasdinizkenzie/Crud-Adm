import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database/config";
import { AppError } from "../error";
import { IUserResultWithPassword } from "../interfaces/user.interfaces";

export const verificationPermitionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(req.params.id);
  const idToken: number = Number(req.user.id);

  const queryString: string = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idToken],
  };

  const queryResult: IUserResultWithPassword = await client.query(queryConfig);

  if (id !== idToken && queryResult.rows[0].admin === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
