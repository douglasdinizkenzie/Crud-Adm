import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database/config";
import { AppError } from "../error";
import { IUserResultWithPassword } from "../interfaces/user.interfaces";

export const ensureIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const reqData = req.user;

  const queryString: string = `
  SELECT *
  FROM users
  WHERE id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [reqData.id],
  };

  const queryResult: IUserResultWithPassword = await client.query(queryConfig);
  if (queryResult.rows[0].admin === false) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
