import { Request, Response } from "express";
import {
  IAllUsers,
  IUserRequest,
  IUserUpdateRequest,
  IUserWithoutPassword,
} from "../interfaces/user.interfaces";
import { createUserService } from "../services/users/createUser.service";
import { listAllUsersService } from "../services/users/listAllUsers.service";
import { listUserService } from "../services/users/listUser.service";
import { softDeleteService } from "../services/users/softDelete.service";
import { updateUserService } from "../services/users/uptadeUser.service";
import { recoverUserService } from "../services/users/recoverUser.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;
  const newUser: IUserWithoutPassword = await createUserService(userData);
  return res.status(201).json(newUser);
};

export const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allUsers: IAllUsers = await listAllUsersService();

  return res.status(200).json(allUsers);
};

export const listUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = Number(req.user.id);
  const user: IUserWithoutPassword = await listUserService(userId);

  return res.status(200).json(user);
};

export const softDeleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  await softDeleteService(id);
  return res.status(204).send();
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  const data: IUserUpdateRequest = req.body;
  const userUpdated: IUserWithoutPassword = await updateUserService(id, data);
  return res.status(200).json(userUpdated);
};

export const recoverUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  const recoveredUser: IUserWithoutPassword = await recoverUserService(id);
  return res.status(200).json(recoveredUser);
};
