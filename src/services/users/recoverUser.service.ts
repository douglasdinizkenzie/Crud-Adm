import { QueryConfig } from "pg";
import { client } from "../../database/config";
import {
  IUserResultWithPassword,
  IUserWithoutPassword,
} from "../../interfaces/user.interfaces";
import { returnUserSchemaWithoutPassword } from "../../schemas/user.schema";

export const recoverUserService = async (
  id: number
): Promise<IUserWithoutPassword> => {
  const queryString: string = `
            UPDATE 
                users
            SET
                "active" = true
            WHERE id = $1
            RETURNING *;
        `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: IUserResultWithPassword = await client.query(queryConfig);
  const updatedUser: IUserWithoutPassword =
    returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);
  return updatedUser;
};
