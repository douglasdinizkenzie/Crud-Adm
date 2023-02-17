import { QueryConfig } from "pg";
import {
  IUserResultWithPassword,
  IUserWithoutPassword,
} from "../../interfaces/user.interfaces";
import { client } from "../../database/config";
import { returnUserSchemaWithoutPassword } from "../../schemas/user.schema";

export const listUserService = async (
  id: number
): Promise<IUserWithoutPassword> => {
  const queryString: string = `
    SELECT *
    FROM users
    WHERE id = $1
    
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const QueryResult: IUserResultWithPassword = await client.query(queryConfig);
  const newUser: IUserWithoutPassword = returnUserSchemaWithoutPassword.parse(
    QueryResult.rows[0]
  );
  return newUser;
};
