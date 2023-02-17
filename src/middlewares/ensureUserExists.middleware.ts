import { NextFunction, Response, Request } from "express";
import { QueryConfig } from "pg";
import { IUserResultWithPassword } from "../interfaces/user.interfaces";
import { client } from "../database/config";
import { AppError } from "../error";

export const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = Number(req.params.id);

  const queryString: string = `
        SELECT *
        FROM users
        WHERE id = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: IUserResultWithPassword = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};
