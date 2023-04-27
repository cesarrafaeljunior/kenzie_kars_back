import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  editUserService,
  resetPasswordService,
  retrieveUserService,
  sendResetEmailPasswordService,
} from "../services/user.services";

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  return res.status(201).json(user);
};

export const retrieveUserProfileController = async (
  req: Request,
  res: Response
) => {
  const user = await retrieveUserService(req.authUser);
  return res.status(200).json(user);
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

export const sendResetEmailPasswordController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  const { protocol } = req;
  const host = req.get("host");

  await sendResetEmailPasswordService(email, protocol, host!);

  return res.status(200).json({ message: "token send" });
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  await resetPasswordService(password, token);

  return res.json({ message: "Senha alterada com sucesso!" });
};
