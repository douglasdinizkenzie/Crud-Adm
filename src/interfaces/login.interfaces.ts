import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schema";

export type ILoginRequest = z.infer<typeof createLoginSchema>;
