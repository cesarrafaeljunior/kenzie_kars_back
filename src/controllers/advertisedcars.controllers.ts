import { Request, Response } from "express";
import {
  createAdvertisedService,
  deleteAdvertisedService,
  editAdvertisedService,
  retrieveAdvertisedByUserService,
  retrieveAdvertisedService,
  retrieveAllAdvertisedService,
} from "../services/advertisedcars.services";

export const createAdvertisedController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const advertisedData = req.body;
  const user = req.authUser;
  const newAvertised = await createAdvertisedService(user, advertisedData);

  return res.status(201).json(newAvertised);
};

export const retrieveAdvertisedByUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.paramUser.id;
  const advertisedData = await retrieveAdvertisedByUserService(userId);

  return res.json(advertisedData);
};
export const retrieveAdvertisedController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const avertised = await retrieveAdvertisedService(req.paramAdvertise);
  return res.status(200).json(avertised);
};

export const retrieveAllAdvertisedController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const advertisedData = await retrieveAllAdvertisedService();

  return res.json(advertisedData);
};

export const editAdvertisedController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const advertisedData = req.body;
  const paramAdvertise = req.paramAdvertise;
  const newaAvertised = await editAdvertisedService(
    paramAdvertise,
    advertisedData
  );

  return res.status(200).json(newaAvertised);
};

export const deleteAdvertisedontroller = async (
  req: Request,
  res: Response
) => {
  await deleteAdvertisedService(req.paramAdvertise);

  return res.status(204).send();
};
