import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { QueryConfig } from "pg";
import { client } from "../../database/config";
import { AppError } from "../../error";
import { ILoginRequest } from "../../interfaces/login.interfaces";
import { IUserResultWithPassword } from "../../interfaces/user.interfaces";
import "dotenv/config";

export const createLoginService = async (
  loginRequest: ILoginRequest
): Promise<string> => {
  const queryStringEmail: string = `
  SELECT *
  FROM users
  WHERE email = $1
  `;
  const queryConfigEmail: QueryConfig = {
    text: queryStringEmail,
    values: [loginRequest.email],
  };

  const queryResultUserPerEmail: IUserResultWithPassword = await client.query(
    queryConfigEmail
  );

  if (queryResultUserPerEmail.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }

  const matchPassword = await compare(
    loginRequest.password,
    queryResultUserPerEmail.rows[0].password
  );
  if (!matchPassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = jwt.sign(
    { email: queryResultUserPerEmail.rows[0].email },
    String(process.env.SECRET_KEY!),
    {
      expiresIn: "24h",
      subject: queryResultUserPerEmail.rows[0].id.toString(),
    }
  );

  return token;
};
