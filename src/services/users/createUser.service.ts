import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database/config";
import { AppError } from "../../error";
import {
  IUserRequest,
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/user.interfaces";
import { returnUserSchemaWithoutPassword } from "../../schemas/user.schema";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
  const queryString: string = format(
    `
    INSERT INTO
            users(%I)
    VALUES (%L)
    RETURNING *;
`,
    Object.keys(userData),
    Object.values(userData)
  );

  const QueryResult: IUserResult = await client.query(queryString);

  const newUser = returnUserSchemaWithoutPassword.parse(QueryResult.rows[0]);
  return newUser;
};
