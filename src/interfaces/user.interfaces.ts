import { QueryResult } from "pg";
import { z } from "zod";
import {
  allUserSchemaWithoutPassword,
  createUserSchema,
  returnUserSchema,
  returnUserSchemaWithoutPassword,
  updateUserSchema,
} from "../schemas/user.schema";

export type IUserRequest = z.infer<typeof createUserSchema>;
export type IUser = z.infer<typeof returnUserSchema>;
export type IUserWithoutPassword = z.infer<
  typeof returnUserSchemaWithoutPassword
>;

export type IUserUpdateRequest = z.infer<typeof updateUserSchema>;

export type IUserResult = QueryResult<IUserWithoutPassword>;
export type IUserResultWithPassword = QueryResult<IUser>;
export type IAllUsers = z.infer<typeof allUserSchemaWithoutPassword>;
