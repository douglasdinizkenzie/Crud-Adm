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
  // const queryStringVerifyEmail: string = `
  //   SELECT *
  //   FROM users
  //   WHERE email = $1
  //   `;
  // const queryConfig: QueryConfig = {
  //   text: queryStringVerifyEmail,
  //   values: [userData.email],
  // };

  // const QueryResultVerifyEmail: QueryResult = await client.query(queryConfig);

  // if (QueryResultVerifyEmail.rowCount > 0) {
  //   throw new AppError("E-mail already registered", 409);
  // }

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
