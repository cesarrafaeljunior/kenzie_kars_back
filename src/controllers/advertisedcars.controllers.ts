import { Request, Response } from "express"
import {
	createAdvertisedService,
	retrieveAdvertisedService,
} from "../services/advertisedcars.services"

export const createAdvertisedController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const advertisedData = req.body
	const userId = req.body.id
	const newContact = await createAdvertisedService(userId, advertisedData)

	return res.status(201).json(newContact)
}

export const retrieveAdvertisedController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId = req.body.id
	const advertisedData = await retrieveAdvertisedService(userId)

	return res.json(advertisedData)
}
