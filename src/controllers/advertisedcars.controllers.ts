import { Request, Response } from "express";
import {
	createAdvertisedService,
	deleteAdvertisedService,
	editAdvertisedService,
	retrieveAdvertisedByUserService,
	retrieveAllAdvertisedService,
} from "../services/advertisedcars.services";

export const createAdvertisedController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const advertisedData = req.body;
	const user = req.authUser;
	const newaAvertised = await createAdvertisedService(user, advertisedData);

	return res.status(201).json(newaAvertised);
};

export const retrieveAdvertisedByUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId = req.params.id;
	const advertisedData = await retrieveAdvertisedByUserService(userId);

	return res.json(advertisedData);
};

export const retrieveAllAdvertisedController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const advertisedData = await retrieveAllAdvertisedService();

	return res.json(advertisedData);
};

export const editAdvertisedController = async (req: Request, res: Response): Promise<Response> => {
	const advertisedData = req.body;
	const advertisedId = req.params.id;
	const newaAvertised = await editAdvertisedService(advertisedId, advertisedData);

	return res.status(201).json(newaAvertised);
};

export const deleteAdvertisedontroller = async (req: Request, res: Response) => {
	await deleteAdvertisedService(req.params.id);

	return res.status(204).send();
};
