import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  editUserService,
  retrieveUserService,
} from "../services/user.services";

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  return res.status(201).json(user);
};

export const retrieveUserController = async (req: Request, res: Response) => {
  const user = await retrieveUserService(req.paramUser);
  return res.status(200).json(user);
};

export const editUserController = async (req: Request, res: Response) => {
  const user = await editUserService(req.body, req.paramUser);
  return res.status(200).json(user);
};

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.paramUser);
  return res.status(204).json({});
};
