import { Router } from "express";
import { bodyValidateMiddleware } from "../middlewares/bodyValidate.middleware";
import { advertisedRequestSchema, advertisedUpdateSchema } from "../schemas/advertisedcars.shemas";
import {
	createAdvertisedController,
	deleteAdvertisedontroller,
	editAdvertisedController,
	retrieveAdvertisedByUserController,
	retrieveAllAdvertisedController,
} from "../controllers/advertisedcars.controllers";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import { isUserExistsMiddleware } from "../middlewares/isUserExists.middleware";

export const advertisedRoutes = Router();

advertisedRoutes.get("", retrieveAllAdvertisedController);
advertisedRoutes.get("/:userId/", retrieveAdvertisedByUserController);
advertisedRoutes.post(
	"",
	verifyTokenMiddleware,
	isUserExistsMiddleware,
	bodyValidateMiddleware(advertisedRequestSchema),
	createAdvertisedController
);
advertisedRoutes.patch(
	"/:id/",
	verifyTokenMiddleware,
	bodyValidateMiddleware(advertisedUpdateSchema),
	editAdvertisedController
);
advertisedRoutes.delete("/:id/", verifyTokenMiddleware, deleteAdvertisedontroller);
