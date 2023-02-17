import { Router } from "express";
import {
  createUserController,
  listAllUsersController,
  listUserController,
  recoverUserController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/user.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { verificationPermitionMiddleware } from "../middlewares/verificationPermition.middleware";
import { verificationEmailExistsMiddleware } from "../middlewares/verificationEmailExists.middleware";

export const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  verificationEmailExistsMiddleware,
  createUserController
);

userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listAllUsersController
);

userRoutes.get("/profile", ensureTokenIsValidMiddleware, listUserController);

userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  verificationPermitionMiddleware,
  softDeleteUserController
);

userRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(updateUserSchema),
  ensureUserExistsMiddleware,
  verificationPermitionMiddleware,
  verificationEmailExistsMiddleware,
  updateUserController
);

userRoutes.put(
  "/:id/recover",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureUserExistsMiddleware,
  recoverUserController
);
