import { QueryResult } from "pg";
import { IAllUsers } from "../../interfaces/user.interfaces";
import { client } from "../../database/config";
import { allUserSchemaWithoutPassword } from "../../schemas/user.schema";
import { Response } from "express";

export const listAllUsersService = async (): Promise<IAllUsers> => {
  const queryString: string = `
    SELECT *
    FROM users
    `;

  const queryResult: QueryResult = await client.query(queryString);
  const newUsers = allUserSchemaWithoutPassword.parse(queryResult.rows);

  return newUsers;
};
