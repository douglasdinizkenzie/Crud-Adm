import { hashSync } from "bcryptjs";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean().optional(),
});

export const returnUserSchema = createUserSchema.extend({
  id: z.number(),
  active: z.boolean(),
});

export const returnUserSchemaWithoutPassword = returnUserSchema.omit({
  password: true,
});

export const allUserSchemaWithoutPassword = z.array(
  returnUserSchemaWithoutPassword
);

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .transform((pass) => {
      return hashSync(pass, 10);
    })
    .optional(),
});
