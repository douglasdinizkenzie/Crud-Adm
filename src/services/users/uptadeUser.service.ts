import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database/config";
import {
  IUserResultWithPassword,
  IUserUpdateRequest,
  IUserWithoutPassword,
} from "../../interfaces/user.interfaces";
import { returnUserSchemaWithoutPassword } from "../../schemas/user.schema";

export const updateUserService = async (
  id: number,
  data: IUserUpdateRequest
): Promise<IUserWithoutPassword> => {
  const queryString: string = format(
    `
    UPDATE users
    SET(%I) = ROW(%L)
    WHERE id = $1
    RETURNING *;
    `,
    Object.keys(data),
    Object.values(data)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: IUserResultWithPassword = await client.query(queryConfig);
  const newUser: IUserWithoutPassword = returnUserSchemaWithoutPassword.parse(
    queryResult.rows[0]
  );

  return newUser;
};
