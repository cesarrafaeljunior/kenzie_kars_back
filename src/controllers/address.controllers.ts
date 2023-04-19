import { Request, Response } from "express";
import {
  createAddressService,
  deleteAddressService,
  editAddressService,
  retrieveAddressUserService,
} from "../services/address.services";

export const createAddressController = async (req: Request, res: Response) => {
  const address = await createAddressService(req.body, req.authUser);

  return res.status(201).json(address);
};

export const retrieveAddressUserController = async (
  req: Request,
  res: Response
) => {
  const address = await retrieveAddressUserService(req.authUser);

  return res.status(200).json(address);
};

export const editAddressControler = async (req: Request, res: Response) => {
  const addressUpdate = await editAddressService(req.authUser, req.body);

  return res.status(200).json(addressUpdate);
};

export const deleteAddressControler = async (req: Request, res: Response) => {
  await deleteAddressService(req.authUser);

  return res.status(204).json({});
};
